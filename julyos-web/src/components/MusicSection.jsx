import { motion } from "framer-motion";

const temas = [
  {
    titulo: "Tema Ejemplo 1",
    descripcion: "Single urbano con esencia trap/purpura.",
    youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_1", // reemplaza cuando tengas el real
  },
  {
    titulo: "Tema Ejemplo 2",
    descripcion: "Colaboración junto a TURROMANTIKOS.",
    youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
  },
];

export default function MusicSection() {
  return (
    <section id="musica" className="py-16 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Música</h2>
        <p className="mt-2 text-gray-400 max-w-xl">
          Últimos lanzamientos de JULYOS, en solitario y junto a{" "}
          <span className="text-purple-400">TURROMANTIKOS</span>.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {temas.map((tema, idx) => (
          <motion.article
            key={tema.titulo}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-gradient-to-br from-purple-900/40 via-black to-black border border-purple-700/40 rounded-2xl p-4 md:p-5"
          >
            <h3 className="text-lg font-semibold">{tema.titulo}</h3>
            <p className="mt-1 text-gray-400 text-sm">{tema.descripcion}</p>

            {/* Cuando tengas el video, descomenta el iframe y reemplaza VIDEO_ID */}
            <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-purple-700/40 flex items-center justify-center text-xs text-gray-500">
              {/* <iframe
                className="w-full h-full"
                src={tema.youtubeUrl}
                title={tema.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
              Embed YouTube / Spotify aquí
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
