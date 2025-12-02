// src/pages/admin/AdminAgenda.jsx
import { useEffect, useState } from "react";
import {
  listenAgenda,
  createFechaAgenda,
  deleteFechaAgenda,
} from "../../services/agendaService";

const AdminAgenda = () => {
  const [fechas, setFechas] = useState([]);
  const [fecha, setFecha] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const unsub = listenAgenda(setFechas);
    return () => unsub();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!fecha || !ciudad || !lugar) return;

    await createFechaAgenda({
      fecha,
      ciudad,
      lugar,
      descripcion,
    });

    setFecha("");
    setCiudad("");
    setLugar("");
    setDescripcion("");
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta fecha de agenda?")) return;
    await deleteFechaAgenda(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-2">Agenda</h2>

      {/* Formulario para agregar nueva fecha */}
      <form onSubmit={handleCreate} className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Fecha</label>
            <input
              type="date"
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Ciudad</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="La Paz, Cochabamba..."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Lugar</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              placeholder="Nombre del local / venue"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Descripción (opcional)</label>
            <input
              className="w-full text-sm px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Show con TURROMANTIKOS, invitado especial..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs tracking-[0.2em] uppercase"
        >
          Agregar fecha
        </button>
      </form>

      {/* Lista de fechas */}
      <div className="border-t border-zinc-800 pt-4 space-y-3">
        {fechas.map((f) => (
          <div
            key={f.id}
            className="flex items-start justify-between gap-4 border border-zinc-800 rounded-2xl px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">
                {f.fecha} • {f.ciudad}
              </p>
              <p className="text-xs text-zinc-300">{f.lugar}</p>
              {f.descripcion && (
                <p className="text-xs text-zinc-400 mt-1">
                  {f.descripcion}
                </p>
              )}
            </div>
            <button
              onClick={() => handleDelete(f.id)}
              className="text-[11px] text-red-400 hover:text-red-300"
            >
              Eliminar
            </button>
          </div>
        ))}

        {fechas.length === 0 && (
          <p className="text-xs text-zinc-500">
            Aún no hay fechas cargadas. Agrega la primera arriba.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminAgenda;
