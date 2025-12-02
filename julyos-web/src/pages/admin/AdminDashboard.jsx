// src/pages/admin/AdminDashboard.jsx
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

// Importar todas las secciones del admin
import AdminCanciones from "../admin/AdminCanciones";
import AdminAgenda from "../admin/AdminAgenda";
import AdminGaleria from "../admin/AdminGaleria";

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [tab, setTab] = useState("canciones");

  return (
    <div className="pt-24 pb-10 px-4 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-[0.25em] uppercase">
            Panel JULYOS
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Sesión: {user?.email || "sin datos"}
          </p>
        </div>

        <button
          onClick={logout}
          className="text-xs px-3 py-1 rounded-full border border-zinc-600 hover:bg-zinc-800"
        >
          Cerrar sesión
        </button>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setTab("canciones")}
          className={`px-3 py-1 rounded-full text-xs border ${
            tab === "canciones"
              ? "border-purple-500 bg-purple-500/20"
              : "border-zinc-700 hover:bg-zinc-800"
          }`}
        >
          Canciones
        </button>

        <button
          onClick={() => setTab("agenda")}
          className={`px-3 py-1 rounded-full text-xs border ${
            tab === "agenda"
              ? "border-purple-500 bg-purple-500/20"
              : "border-zinc-700 hover:bg-zinc-800"
          }`}
        >
          Agenda
        </button>

        <button
          onClick={() => setTab("galeria")}
          className={`px-3 py-1 rounded-full text-xs border ${
            tab === "galeria"
              ? "border-purple-500 bg-purple-500/20"
              : "border-zinc-700 hover:bg-zinc-800"
          }`}
        >
          Galería
        </button>
      </div>

      {/* CONTENIDO */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6">
        {tab === "canciones" && <AdminCanciones />}
        {tab === "agenda" && <AdminAgenda />}
        {tab === "galeria" && <AdminGaleria />}
      </div>
    </div>
  );
};

export default AdminDashboard;
