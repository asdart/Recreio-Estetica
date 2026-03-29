export type ProfessionalValidationStatus =
  | "not_submitted"
  | "pending"
  | "approved"
  | "rejected";

export type UserAccess = {
  isLoggedIn: boolean;
  validationStatus: ProfessionalValidationStatus;
  canSeePrice: boolean;
  canCheckout: boolean;
};
