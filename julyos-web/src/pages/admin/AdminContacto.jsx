// src/pages/admin/AdminContacto.jsx
import { useEffect, useState } from "react";
import {
  listenContacto,
  saveContacto,
} from "../../services/contactService";

const AdminContacto = () => {
  const [datos, setDatos] = useState({
    bookingEmail: "",
    contactoEmail: "",
    managerNombre: "",
    managerTelefono: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    spotify: "",
  });

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = listenContacto((data) => {
      if (data) setDatos((prev) => ({ ...prev, ...data }));
      setCargando(false);
    });
    return () => unsub();
  }, []);

  const handleChange = (field, value) => {
    setDatos((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      setGuardando(true);
      await saveContacto(datos);
      setOk("Datos de contacto actualizados correctamente.");
    } catch (err) {
      console.error(err);
      setError("Hubo un error al guardar. Intenta de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return <p className="text-xs text-zinc-500">Cargando datos...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-2">Contacto</h2>
      <p className="text-xs text-zinc-400 mb-4">
        Edita aquí los datos de contacto oficiales de JULYOS.
      </p>

      {error && (
        <div className="text-xs text-red-400 bg-red-900/30 rounded-xl px-3 py-2">
          {error}
        </div>
      )}
      {ok && (
        <div className="text-xs text-emerald-400 bg-emerald-900/20 rounded-xl px-3 py-2">
          {ok}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Correos */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">
              Correo de booking / management
            </label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.bookingEmail}
              onChange={(e) => handleChange("bookingEmail", e.target.value)}
              placeholder="booking@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-xs mb-1">
              Correo de contacto general
            </label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.contactoEmail}
              onChange={(e) =>
                handleChange("contactoEmail", e.target.value)
              }
              placeholder="contacto@ejemplo.com"
            />
          </div>
        </div>

        {/* Manager */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Nombre del manager</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.managerNombre}
              onChange={(e) =>
                handleChange("managerNombre", e.target.value)
              }
              placeholder="Nombre del manager"
            />
          </div>

          <div>
            <label className="block text-xs mb-1">
              Teléfono del manager (WhatsApp)
            </label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.managerTelefono}
              onChange={(e) =>
                handleChange("managerTelefono", e.target.value)
              }
              placeholder="+591 70000000"
            />
          </div>
        </div>

        {/* Redes */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Instagram (URL)</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="https://instagram.com/julyos..."
            />
          </div>

          <div>
            <label className="block text-xs mb-1">TikTok (URL)</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.tiktok}
              onChange={(e) => handleChange("tiktok", e.target.value)}
              placeholder="https://tiktok.com/@julyos..."
            />
          </div>

          <div>
            <label className="block text-xs mb-1">YouTube (URL)</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.youtube}
              onChange={(e) => handleChange("youtube", e.target.value)}
              placeholder="https://youtube.com/@julyos..."
            />
          </div>

          <div>
            <label className="block text-xs mb-1">Spotify (URL)</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={datos.spotify}
              onChange={(e) => handleChange("spotify", e.target.value)}
              placeholder="https://open.spotify.com/artist/..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={guardando}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-xs tracking-[0.2em] uppercase"
        >
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
};

export default AdminContacto;
