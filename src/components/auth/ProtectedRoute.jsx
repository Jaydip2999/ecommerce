import { Navigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { useShop } from "../../context/useShop";

function ProtectedRoute({ children, role }) {
  const { user } = useShop();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <section className="auth-shell">
        <div className="auth-card access-card">
          <LockKeyhole size={42} />
          <span>Access denied</span>
          <h1>Admin Only</h1>
          <p>This dashboard is available only for admin accounts.</p>
        </div>
      </section>
    );
  }

  return children;
}

export default ProtectedRoute;
