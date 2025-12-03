// src/pages/admin/AdminGaleria.jsx
import { useEffect, useState } from "react";
import {
  listenGaleria,
  createItemGaleria,
  deleteItemGaleria,
} from "../../services/galeriaService";

const opcionesTipo = [
  "Show en vivo",
  "Estudio",
  "Sesión de fotos",
  "Con TURROMANTIKOS",
  "Detrás de cámaras",
];

const AdminGaleria = () => {
  const [items, setItems] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState(opcionesTipo[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = listenGaleria(setItems);
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageUrl) {
      setError("Pega la URL de una imagen.");
      return;
    }

    try {
      setGuardando(true);

      await createItemGaleria({
        titulo: titulo || "Foto sin título",
        tipo,
        imageUrl,
      });

      setTitulo("");
      setTipo(opcionesTipo[0]);
      setImageUrl("");
    } catch (err) {
      console.error(err);
      setError("Error al guardar la imagen. Revisa la URL.");
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm("¿Eliminar esta imagen de la galería?")) return;

    try {
      await deleteItemGaleria(item.id);
    } catch (err) {
      console.error(err);
      alert("Error eliminando la imagen.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-2">Galería</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="text-xs text-red-400 bg-red-900/30 rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Título (opcional)</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Show en Santa Cruz, Sesión en estudio..."
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Tipo</label>
            <select
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              {opcionesTipo.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1">URL de la imagen</label>
          <input
            className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://tuservidor.com/imagen.jpg"
          />
          <p className="mt-1 text-[10px] text-zinc-500">
            Sube tus fotos a otro servicio (p.ej. Imgur, Cloudinary, carpeta estática) y pega aquí la URL directa de la imagen.
          </p>
        </div>

        <button
          type="submit"
          disabled={guardando}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-xs tracking-[0.2em] uppercase"
        >
          {guardando ? "Guardando..." : "Agregar a galería"}
        </button>
      </form>

      {/* Grid de imágenes */}
      <div className="border-t border-zinc-800 pt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950/60 flex flex-col"
          >
            <div className="aspect-video overflow-hidden">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.titulo || "Imagen galería"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-purple-300 mb-1 uppercase tracking-[0.15em]">
                  {item.tipo}
                </p>
                <p className="text-sm text-zinc-100 line-clamp-2">
                  {item.titulo || "Sin título"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item)}
                className="mt-2 text-[11px] text-red-400 hover:text-red-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-xs text-zinc-500">
            Aún no hay imágenes en la galería. Agrega la primera arriba.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminGaleria;
