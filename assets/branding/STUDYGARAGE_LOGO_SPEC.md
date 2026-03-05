# StudyGarage Logo Handoff (2026 Minimal Premium)

## 1) Primary Mark
- File: `assets/branding/studygarage-monogram.svg`
- Mark type: geometric `SG` monogram
- Stroke system:
  - Stroke width: `76`
  - Cap: `round`
  - Join: `round`
- Primary color:
  - `#F5F7FF` (on dark backgrounds)
- Recommended background:
  - `#0B0C10`

## 2) App Icon (1024 x 1024)
- File: `assets/branding/studygarage-app-icon-1024.svg`
- Canvas: `1024 x 1024`
- Background: `#0B0C10`
- Safe area:
  - Keep all logo strokes inside a `148px` inset
  - Usable logo box: `728 x 728`
- Accent treatment:
  - Very subtle top-left edge highlight only (2px, low opacity)

## 3) Typography System (Wordmark Guidance)
Use this for lockups/marketing (not embedded in SVG mark):
- Style: geometric sans / neo-grotesk
- Weight: `800` preferred
- Tracking: `-2%` to `-3%`
- Color: `#F5F7FF` on dark, `#0B0C10` on light

## 4) Spacing Rules
- Minimum clear space around monogram: `0.5x` mark height
- Minimum app usage size:
  - Icon-only: `20px`
  - Monogram with label: `64px` height

## 5) Export Pack
Generate these outputs from SVG master:
- App icon PNGs: `1024, 512, 192, 180, 128, 64`
- Optional favicon: `32, 16`

## 6) Splash Motion (Subtle)
Suggested sequence for splash logo reveal:
- `0ms - 220ms`: opacity `0 -> 1`
- `120ms - 420ms`: scale `0.96 -> 1.0` with soft spring
- No rotation, no shine sweep, no particle/confetti

Example parameters:
- opacity timing: `220ms`, easing `easeOut`
- scale spring: damping `16`, stiffness `170`, mass `0.8`

## 7) Implementation Notes
- Keep mark monochrome in app shell screens.
- Reserve accent glow only for rewards, not branding mark.
- Do not add gradients to the monogram itself.
