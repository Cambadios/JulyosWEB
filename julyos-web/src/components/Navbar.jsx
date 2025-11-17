import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md border-b border-purple-700/40 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500" />
          <h1 className="text-lg md:text-xl font-bold tracking-[0.3em]">
            JULYOS
          </h1>
        </div>

        <nav className="hidden md:flex gap-6 text-xs md:text-sm tracking-[0.15em] uppercase">
          <a href="#inicio" className="hover:text-purple-400 transition">Inicio</a>
          <a href="#musica" className="hover:text-purple-400 transition">Música</a>
          <a href="#fotos" className="hover:text-purple-400 transition">Fotos</a>
          <a href="#agenda" className="hover:text-purple-400 transition">Agenda</a>
          <a href="#contacto" className="hover:text-purple-400 transition">Contacto</a>
        </nav>
      </div>
    </motion.header>
  );
}
