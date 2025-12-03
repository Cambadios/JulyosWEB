// src/components/ContactSection.jsx
import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { listenContacto } from "../services/contactService";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsub = listenContacto((data) => {
      setDatos(data);
      setCargando(false);
    });
    return () => unsub();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  if (cargando) return null;

  const whatsappLink = datos?.managerTelefono
    ? `https://wa.me/${datos.managerTelefono.replace(/\D/g, "")}`
    : "#";

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-16 px-4 max-w-6xl mx-auto"
    >
      <h2 className="text-sm tracking-[0.3em] uppercase text-zinc-400 mb-2">
        Contacto
      </h2>

      <h3 className="text-3xl md:text-4xl font-semibold mb-6">
        Contacto oficial
      </h3>

      <div className="space-y-6 text-sm text-zinc-300">

        <p>
          Información oficial de contacto para booking, colaboraciones y prensa.
          Estos datos se actualizan desde el panel de administración.
        </p>

        <p>
          <span className="font-medium text-zinc-200">Booking / Management:</span>{" "}
          {datos?.bookingEmail || "No disponible"}
        </p>

        <p>
          <span className="font-medium text-zinc-200">Correo general:</span>{" "}
          {datos?.contactoEmail || "No disponible"}
        </p>

        {/* Manager info */}
        <p>
          <span className="font-medium text-zinc-200">Manager:</span>{" "}
          {datos?.managerNombre || "No disponible"}
        </p>

        <p>
          <span className="font-medium text-zinc-200">Teléfono del manager:</span>{" "}
          {datos?.managerTelefono ? (
            <a
              className="text-purple-300 hover:text-purple-200 underline"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              {datos.managerTelefono}
            </a>
          ) : (
            "No disponible"
          )}
        </p>

        {/* Redes */}
        <div className="pt-4">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">
            Redes oficiales
          </p>

          <div className="flex flex-wrap gap-2">
            <a href={datos?.instagram || "#"} target="_blank"
              className="px-3 py-1.5 rounded-full border border-zinc-700 text-xs hover:border-purple-400 hover:text-purple-200">
              Instagram
            </a>
            <a href={datos?.tiktok || "#"} target="_blank"
              className="px-3 py-1.5 rounded-full border border-zinc-700 text-xs hover:border-purple-400 hover:text-purple-200">
              TikTok
            </a>
            <a href={datos?.youtube || "#"} target="_blank"
              className="px-3 py-1.5 rounded-full border border-zinc-700 text-xs hover:border-purple-400 hover:text-purple-200">
              YouTube
            </a>
            <a href={datos?.spotify || "#"} target="_blank"
              className="px-3 py-1.5 rounded-full border border-zinc-700 text-xs hover:border-purple-400 hover:text-purple-200">
              Spotify
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
