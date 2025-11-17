import { motion } from "framer-motion";

const fechas = [
  {
    fecha: "12 Dic 2025",
    ciudad: "Cochabamba",
    detalle: "Show con TURROMANTIKOS",
  },
  {
    fecha: "20 Dic 2025",
    ciudad: "La Paz",
    detalle: "Show solista",
  },
  {
    fecha: "05 Ene 2026",
    ciudad: "Santa Cruz",
    detalle: "Festival urbano",
  },
];

export default function AgendaSection() {
  return (
    <section id="agenda" className="py-16 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">Agenda</h2>
        <p className="mt-2 text-gray-400 max-w-xl">
          Próximas presentaciones, giras y fechas clave.
        </p>
      </motion.div>

      <motion.ul
        className="mt-8 divide-y divide-purple-900/60 border border-purple-900/60 rounded-2xl overflow-hidden bg-black/40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {fechas.map((f, idx) => (
          <motion.li
            key={idx}
            className="px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <div>
              <p className="text-sm font-semibold text-purple-300">{f.fecha}</p>
              <p className="text-base md:text-lg font-medium">
                {f.ciudad}
              </p>
            </div>
            <p className="text-sm text-gray-300">{f.detalle}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
