
import { CompanyLayoutTypes } from "@/types/types";
import AdminProtectedRoute from "./adminprotectedroute";

export default function CompanyLayout({ children }: CompanyLayoutTypes) {
  return <AdminProtectedRoute> {children}</AdminProtectedRoute>
  ;
}
