import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtil";

export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
