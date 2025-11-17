import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen grid md:grid-cols-2 items-center px-6 pt-32 md:pt-36 max-w-6xl mx-auto gap-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs tracking-[0.3em] text-purple-400 uppercase">
          Artista urbano • Bolivia
        </p>

        <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-[0.25em]">
          JULYOS
        </h1>

        <p className="mt-5 text-gray-300 max-w-md">
          Sonido urbano con esencia de la calle. Integrante de{" "}
          <span className="text-purple-400 font-semibold">TURROMANTIKOS</span> y
          artista solista con visión global.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#musica"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-sm font-medium transition"
          >
            🎧 Escuchar música
          </a>
          <a
            href="#agenda"
            className="px-6 py-3 rounded-full border border-purple-500/70 hover:bg-purple-500/10 text-sm font-medium transition"
          >
            🎤 Ver próximas fechas
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs text-gray-400">
          <a href="#" target="_blank" className="hover:text-purple-400">
            Instagram
          </a>
          <a href="#" target="_blank" className="hover:text-purple-400">
            TikTok
          </a>
          <a href="#" target="_blank" className="hover:text-purple-400">
            YouTube
          </a>
          <a href="#" target="_blank" className="hover:text-purple-400">
            Spotify
          </a>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center md:justify-end"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="relative w-64 h-80 md:w-72 md:h-96">
          <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-blue-500 blur-xl opacity-60" />
          <div className="relative w-full h-full rounded-3xl border border-purple-400/40 bg-gradient-to-b from-black/80 to-purple-950/60 flex items-center justify-center">
            <span className="text-[0.7rem] tracking-[0.35em] text-gray-300 uppercase">
              Foto JULYOS / Arte
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
