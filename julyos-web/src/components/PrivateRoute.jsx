import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-zinc-400">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/julyos-login" replace />;
  }

  return children;
};

export default PrivateRoute;
