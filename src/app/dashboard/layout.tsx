import { AdminLayoutTypes } from "@/types/types";
import AdminProtectedRoute from "./adminprotectedroute";

export default function AdminLayout({ children }: AdminLayoutTypes) {
  return <AdminProtectedRoute> {children}</AdminProtectedRoute>;
}
