"use client";

import { ReactNode } from "react";
import AdminProtectedRoute from "./adminprotectedroute";
type CompanyLayoutTypes = {
  children: ReactNode;
};
export default function CompanyLayout({ children }: CompanyLayoutTypes) {
  return <AdminProtectedRoute> {children}</AdminProtectedRoute>
  ;
}
