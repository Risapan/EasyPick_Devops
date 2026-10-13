import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CustomerDashboard from "../pages/CustomerDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";

/**
 * Routes to the correct dashboard based on user role.
 */
function DashboardRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "owner":
      return <OwnerDashboard />;
    case "customer":
    default:
      return <CustomerDashboard />;
  }
}

export default DashboardRouter;
