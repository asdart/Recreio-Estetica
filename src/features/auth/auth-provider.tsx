"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Customer, UserAccess, ProfessionalValidationStatus } from "@/types";
import { mockCustomerApproved } from "@/mocks";

type AuthContextType = {
  customer: Customer | null;
  access: UserAccess;
  login: (email: string, password: string) => void;
  logout: () => void;
  setMockStatus: (status: ProfessionalValidationStatus) => void;
};

const defaultAccess: UserAccess = {
  isLoggedIn: false,
  validationStatus: "not_submitted",
  canSeePrice: false,
  canCheckout: false,
};

export const AuthContext = createContext<AuthContextType>({
  customer: null,
  access: defaultAccess,
  login: () => {},
  logout: () => {},
  setMockStatus: () => {},
});

function buildAccess(customer: Customer | null): UserAccess {
  if (!customer) return defaultAccess;
  const isApproved = customer.validationStatus === "approved";
  return {
    isLoggedIn: true,
    validationStatus: customer.validationStatus,
    canSeePrice: isApproved,
    canCheckout: isApproved,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const login = useCallback((_email: string, _password: string) => {
    setCustomer(mockCustomerApproved);
  }, []);

  const logout = useCallback(() => {
    setCustomer(null);
  }, []);

  const setMockStatus = useCallback(
    (status: ProfessionalValidationStatus) => {
      if (!customer) {
        setCustomer({ ...mockCustomerApproved, validationStatus: status });
      } else {
        setCustomer((prev) =>
          prev ? { ...prev, validationStatus: status } : null
        );
      }
    },
    [customer]
  );

  const access = useMemo(() => buildAccess(customer), [customer]);

  const value = useMemo(
    () => ({ customer, access, login, logout, setMockStatus }),
    [customer, access, login, logout, setMockStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
