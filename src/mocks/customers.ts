import { Customer } from "@/types";

export const mockCustomerApproved: Customer = {
  id: "cust-1",
  firstName: "Ana",
  lastName: "Oliveira",
  email: "ana.oliveira@clinicaestetica.com.br",
  phone: "21999887766",
  professionalType: "medico",
  registrationNumber: "CRM-RJ 123456",
  validationStatus: "approved",
  createdAt: "2025-08-15T10:30:00Z",
};

export const mockCustomerPending: Customer = {
  id: "cust-2",
  firstName: "Carlos",
  lastName: "Santos",
  email: "carlos.santos@odonto.com.br",
  phone: "21988776655",
  professionalType: "dentista",
  registrationNumber: "CRO-RJ 78901",
  validationStatus: "pending",
  createdAt: "2026-03-20T14:00:00Z",
};

export const mockCustomerRejected: Customer = {
  id: "cust-3",
  firstName: "Mariana",
  lastName: "Lima",
  email: "mariana.lima@gmail.com",
  phone: "21977665544",
  professionalType: "esteticista",
  registrationNumber: "CREF-00000",
  validationStatus: "rejected",
  createdAt: "2026-03-10T09:15:00Z",
};

export const mockCustomerNotSubmitted: Customer = {
  id: "cust-4",
  firstName: "Rafael",
  lastName: "Costa",
  email: "rafael.costa@bio.com.br",
  phone: "21966554433",
  professionalType: "biomedico",
  registrationNumber: "",
  validationStatus: "not_submitted",
  createdAt: "2026-03-28T18:45:00Z",
};
