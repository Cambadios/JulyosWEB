// src/pages/admin/AdminCanciones.jsx
import { useEffect, useState } from "react";
import {
  listenCanciones,
  createCancion,
  deleteCancion,
} from "../../services/cancionesService";

// 🔧 Convierte cualquier URL de YouTube a formato embed
const normalizeYouTubeUrl = (url) => {
  if (!url) return "";

  // Si ya es /embed/, la dejamos
  if (url.includes("embed")) return url;

  // Intentar sacar el ID cuando es /watch?v=VIDEO_ID
  const match = url.match(/v=([^&]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  // Último recurso: devolver lo que vino
  return url;
};

const AdminCanciones = () => {
  const [canciones, setCanciones] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  useEffect(() => {
    const unsub = listenCanciones(setCanciones);
    return () => unsub();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!titulo || !youtubeUrl) return;

    const finalUrl = normalizeYouTubeUrl(youtubeUrl);

    await createCancion({
      titulo,
      descripcion,
      youtubeUrl: finalUrl,
    });

    setTitulo("");
    setDescripcion("");
    setYoutubeUrl("");
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta canción?")) return;
    await deleteCancion(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-2">Canciones</h2>

      {/* Form agregar */}
      <form onSubmit={handleCreate} className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Título</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="FASES, Noches de julio..."
            />
          </div>
          <div>
            <label className="block text-xs mb-1">URL de YouTube</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Pega aquí el link del video"
            />
            <p className="mt-1 text-[10px] text-zinc-500">
              Puedes pegar el enlace normal (https://www.youtube.com/watch?v=...),
              se convertirá automáticamente a formato embed.
            </p>
          </div>
        </div>
        <div>
          <label className="block text-xs mb-1">Descripción (opcional)</label>
          <textarea
            className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
            rows={2}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="FASES - JULYOS (Official Video)"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs tracking-[0.2em] uppercase"
        >
          Agregar canción
        </button>
      </form>

      {/* Lista */}
      <div className="border-t border-zinc-800 pt-4 space-y-3">
        {canciones.map((c) => (
          <div
            key={c.id}
            className="flex items-start justify-between gap-4 border border-zinc-800 rounded-2xl px-4 py-3"
          >
            <div>
              <h3 className="text-sm font-medium">{c.titulo}</h3>
              {c.descripcion && (
                <p className="text-xs text-zinc-400">{c.descripcion}</p>
              )}
              {c.youtubeUrl && (
                <p className="text-[11px] text-purple-300 mt-1 break-all">
                  {c.youtubeUrl}
                </p>
              )}
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="text-[11px] text-red-400 hover:text-red-300"
            >
              Eliminar
            </button>
          </div>
        ))}

        {canciones.length === 0 && (
          <p className="text-xs text-zinc-500">
            Aún no hay canciones cargadas. Agrega la primera arriba.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminCanciones;
