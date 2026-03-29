import { ProfessionalValidationStatus } from "./validation";

export type ProfessionalType =
  | "medico"
  | "dentista"
  | "biomedico"
  | "farmaceutico"
  | "enfermeiro"
  | "fisioterapeuta"
  | "esteticista";

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  professionalType: ProfessionalType;
  registrationNumber: string;
  validationStatus: ProfessionalValidationStatus;
  createdAt: string;
};
