import { motion } from "framer-motion";

const fotos = [
  { label: "Show en vivo", tipo: "live" },
  { label: "Estudio", tipo: "studio" },
  { label: "Sesión foto", tipo: "photoshoot" },
  { label: "Con TURROMANTIKOS", tipo: "grupo" },
];

export default function GallerySection() {
  return (
    <section id="fotos" className="py-16 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Galería</h2>
        <p className="mt-2 text-gray-400 max-w-xl">
          Momentos que marcan el camino: escenarios, estudio, giras y calle.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {fotos.map((foto, idx) => (
          <motion.div
            key={foto.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative h-40 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 overflow-hidden cursor-pointer group"
          >
            {/* Aquí luego pones <img src={...} /> */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
            <div className="absolute bottom-3 left-3">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-200">
                {foto.tipo}
              </p>
              <p className="text-sm font-semibold">{foto.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
