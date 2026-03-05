const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPI_ID_REGEX = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/;

export function normalizePhoneNumber(value = "") {
  return String(value).replace(/\D/g, "").slice(0, 10);
}

export function validateRedeemForm({
  fullName,
  email,
  phoneNumber,
  upiId,
  requireUpiId = false,
}) {
  const errors = {
    fullName: "",
    email: "",
    phoneNumber: "",
    upiId: "",
  };

  const safeName = String(fullName || "").trim();
  const safeEmail = String(email || "").trim();
  const safePhone = normalizePhoneNumber(phoneNumber);
  const safeUpiId = String(upiId || "").trim().toLowerCase();

  if (!safeName) {
    errors.fullName = "Full name is required.";
  }

  if (!safeEmail) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(safeEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!safePhone) {
    errors.phoneNumber = "Phone number is required.";
  } else if (safePhone.length !== 10) {
    errors.phoneNumber = "Phone number must be 10 digits.";
  }

  if (requireUpiId) {
    if (!safeUpiId) {
      errors.upiId = "UPI ID is required.";
    } else if (!UPI_ID_REGEX.test(safeUpiId)) {
      errors.upiId = "Enter a valid UPI ID.";
    }
  }

  const isValid =
    !errors.fullName && !errors.email && !errors.phoneNumber && !errors.upiId;

  return {
    isValid,
    errors,
    values: {
      fullName: safeName,
      email: safeEmail,
      phoneNumber: safePhone,
      upiId: safeUpiId,
    },
  };
}
