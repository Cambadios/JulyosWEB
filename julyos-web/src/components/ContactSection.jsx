import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contacto" className="py-16 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">Contacto / Booking</h2>
        <p className="mt-2 text-gray-400 max-w-xl">
          Contrataciones, prensa, colaboraciones y management.
        </p>
      </motion.div>

      <motion.div
        className="mt-8 grid gap-8 md:grid-cols-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-3 text-sm">
          <p>
            Email:{" "}
            <a
              href="mailto:booking@julyos.com"
              className="text-purple-400 hover:text-purple-300"
            >
              booking@julyos.com
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a
              href="https://wa.me/59170000000"
              target="_blank"
              className="text-purple-400 hover:text-purple-300"
            >
              +591 70000000
            </a>
          </p>
          <p>Manager: Nombre del manager</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-gray-200">Redes oficiales</p>
          <ul className="space-y-1">
            <li>Instagram: <span className="text-purple-400">@julyos.yb</span></li>
            <li>TikTok: <span className="text-purple-400">@julyos.tiktok</span></li>
            <li>YouTube: <span className="text-purple-400">JULYOS Oficial</span></li>
            <li>Spotify: <span className="text-purple-400">JULYOS</span></li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
