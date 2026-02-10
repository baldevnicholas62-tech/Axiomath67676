import { Navigate } from "react-router-dom";
import db from "../db";

export default function ProtectedRoute({ children }) {
  const { isLoading, user } = db.useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
