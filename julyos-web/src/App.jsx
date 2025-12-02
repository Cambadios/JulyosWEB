import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginAdmin from "../src/pages/LoginAdmin";
import AdminDashboard from "../src/pages/admin/AdminDashboard";
import PrivateRoute from "../src/components/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <Navbar />
      <Routes>
        {/* Ruta pública para seguidores */}
        <Route path="/" element={<Home />} />

        {/* Ruta oculta de login (no la pones en la navbar) */}
        <Route path="/julyos-login" element={<LoginAdmin />} />

        {/* Ruta privada de admin */}
        <Route
          path="/julyos-admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
