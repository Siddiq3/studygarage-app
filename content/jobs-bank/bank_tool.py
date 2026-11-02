#!/usr/bin/env python3
"""Jobs question bank. Drafts live here; only human-approved questions ever reach QuizData.

  validate                         check every bank file
  export-review FILE.csv           write a sheet for the reviewer
  import-review FILE.csv NAME      apply the reviewer's decisions, signed with NAME
  publish QUIZDATA_CLONE           write approved questions into a QuizData clone
  test-fixture EMPTY_DIR           build a local-only copy to test the app. Never publish this.
"""
import csv, json, re, shutil, sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent
BANK = ROOT / "bank"
MANIFEST = json.loads((ROOT / "manifest.json").read_text("utf8"))
STATUSES = {"draft", "in_review", "approved", "rejected"}
DIFFICULTIES = {"easy", "medium", "hard"}
# Our questions are original. Nothing may claim to come from a real paper.
FORBIDDEN = re.compile(r"previous[- ]year|\bpyq\b|official (paper|question)|asked in|actual exam|memory[- ]based", re.I)
PUBLIC_FIELDS = ["id", "name", "subject", "chapter", "question", "correct_answer", "incorrect_answers",
                 "explanation", "difficulty", "syllabus_ref", "origin"]


def slug(text):
    return re.sub(r"-+", "-", re.sub(r"\s+", "-", re.sub(r"[^\w\s-]", "", text.lower().replace("&", " and ").strip())))


def bank_files():
    return sorted(BANK.glob("*/*/*.json"))


def load(path):
    return json.loads(path.read_text("utf8"))


def save(path, questions):
    path.write_text(json.dumps(questions, ensure_ascii=False, indent=1) + "\n", "utf8")


def validate():
    errors, seen_ids, seen_text = [], set(), set()
    for path in bank_files():
        exam_id, subject_slug = path.parts[-3], path.parts[-2]
        exam = MANIFEST.get(exam_id)
        if not exam:
            errors.append(f"{path}: exam not in manifest")
            continue
        if exam.get("syllabus_unverified"):
            errors.append(f"{path}: {exam['name']} has no verified syllabus yet")
            continue
        subjects = {slug(name): (name, info) for name, info in exam["subjects"].items()}
        if subject_slug not in subjects:
            errors.append(f"{path}: subject not in manifest")
            continue
        name, info = subjects[subject_slug]
        for q in load(path):
            where = f"{path.name} {q.get('id', '?')}"
            for field in ["id", "question", "correct_answer", "explanation", "difficulty", "syllabus_ref", "origin", "verification"]:
                if not q.get(field):
                    errors.append(f"{where}: missing {field}")
            wrong = q.get("incorrect_answers", [])
            options = [q.get("correct_answer"), *wrong]
            if len(wrong) != 3 or len({str(o).strip().lower() for o in options}) != 4:
                errors.append(f"{where}: needs 1 correct and 3 different wrong answers")
            if q.get("id") in seen_ids:
                errors.append(f"{where}: duplicate id")
            seen_ids.add(q.get("id"))
            text = str(q.get("question", "")).strip().lower()
            if text in seen_text:
                errors.append(f"{where}: duplicate question")
            seen_text.add(text)
            if q.get("subject") != name:
                errors.append(f"{where}: subject does not match folder")
            if q.get("chapter") not in info["topics"]:
                errors.append(f"{where}: topic not in manifest")
            if q.get("syllabus_ref") != info["syllabus_ref"]:
                errors.append(f"{where}: syllabus_ref does not match manifest")
            if q.get("difficulty") not in DIFFICULTIES:
                errors.append(f"{where}: bad difficulty")
            status = q.get("verification", {}).get("status")
            if status not in STATUSES:
                errors.append(f"{where}: bad verification status")
            if status == "approved" and not (q["verification"].get("reviewed_by") and q["verification"].get("reviewed_on")):
                errors.append(f"{where}: approved without a reviewer and date")
            if FORBIDDEN.search(json.dumps({k: q.get(k) for k in ["question", "explanation", "origin"]}, ensure_ascii=False)):
                errors.append(f"{where}: must not claim to come from a real paper")
            check = q.get("machine_check")
            if check is not None:
                # Our own data, with builtins limited to these helpers.
                got = eval(check["calc"], {"__builtins__": {}}, {"max": max, "ord": ord})
                expected = check["expected"]
                same = got == expected if isinstance(expected, bool) else abs(got - expected) < 1e-9
                if not same:
                    errors.append(f"{where}: answer check failed, {check['calc']} = {got}, expected {expected}")
    return errors


def require_valid():
    errors = validate()
    if errors:
        print("\n".join(errors))
        sys.exit(f"{len(errors)} problem(s). Nothing was written.")


def write_tree(out, keep):
    count = 0
    exam_ids = {}
    for path in bank_files():
        questions = [q for q in load(path) if keep(q)]
        if not questions:
            continue
        exam_id, subject_slug = path.parts[-3], path.parts[-2]
        target = out / "quizdata" / "jobs" / exam_id / subject_slug / path.name
        target.parent.mkdir(parents=True, exist_ok=True)
        public = [{**{f: q.get(f) for f in PUBLIC_FIELDS}, "verification_status": q["verification"]["status"]} for q in questions]
        target.write_text(json.dumps({"results": public}, ensure_ascii=False, indent=1) + "\n", "utf8")
        exam_ids.setdefault(exam_id, []).append({
            "subject": questions[0]["subject"], "chapter": questions[0]["chapter"],
            "slug": path.stem, "file": path.name, "count": len(public),
        })
        count += len(public)
    for exam_id in MANIFEST:
        target = out / "quizdata" / "jobs" / exam_id / "index.json"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps({"results": exam_ids.get(exam_id, [])}, ensure_ascii=False, indent=1) + "\n", "utf8")
    return count


def publish(clone):
    require_valid()
    out = Path(clone)
    if not (out / ".git").exists():
        sys.exit("Publish target must be a QuizData git clone.")
    # Student data must never sit beside public quiz content.
    if (out / "redeemRequests").exists():
        sys.exit("Refusing to publish: this repo still contains redeemRequests/. Remove student data first.")
    shutil.rmtree(out / "quizdata" / "jobs", ignore_errors=True)
    print(write_tree(out, lambda q: q["verification"]["status"] == "approved"), "approved questions written. Review the diff, then push.")


def test_fixture(directory):
    require_valid()
    out = Path(directory)
    if (out / ".git").exists():
        sys.exit("A test fixture contains unreviewed questions, so it cannot go in a git repo.")
    print(write_tree(out, lambda q: True), "questions written for local testing only.")


def export_review(csv_path):
    require_valid()
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.writer(handle)
        writer.writerow(["decision (approve/reject)", "reviewer note", "id", "exam", "subject", "topic", "difficulty",
                         "question", "correct answer", "wrong 1", "wrong 2", "wrong 3", "explanation", "answer auto-checked", "status"])
        for path in bank_files():
            for q in load(path):
                writer.writerow(["", "", q["id"], path.parts[-3], q["subject"], q["chapter"], q["difficulty"], q["question"], q["correct_answer"],
                                 *q["incorrect_answers"], q["explanation"], "yes" if q.get("machine_check") else "no", q["verification"]["status"]])


def import_review(csv_path, reviewer):
    if not reviewer.strip():
        sys.exit("A reviewer name is required.")
    with open(csv_path, newline="", encoding="utf-8-sig") as handle:
        rows = {row["id"]: row for row in csv.DictReader(handle)}
    today, changed = date.today().isoformat(), 0
    for path in bank_files():
        questions = load(path)
        for q in questions:
            decision = rows.get(q["id"], {}).get("decision (approve/reject)", "").strip().lower()
            if decision in ("approve", "reject"):
                q["verification"] = {"status": "approved" if decision == "approve" else "rejected", "reviewed_by": reviewer,
                                     "reviewed_on": today, "note": rows[q["id"]].get("reviewer note", "")}
                changed += 1
        save(path, questions)
    print(changed, "decisions applied.")


if __name__ == "__main__":
    command = sys.argv[1] if len(sys.argv) > 1 else ""
    if command == "validate":
        problems = validate()
        print("\n".join(problems) or f"OK: {sum(len(load(p)) for p in bank_files())} questions")
        sys.exit(1 if problems else 0)
    actions = {"export-review": export_review, "publish": publish, "test-fixture": test_fixture}
    if command in actions and len(sys.argv) == 3:
        actions[command](sys.argv[2])
    elif command == "import-review" and len(sys.argv) == 4:
        import_review(sys.argv[2], sys.argv[3])
    else:
        sys.exit(__doc__)
