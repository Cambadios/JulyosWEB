import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { listenAgenda } from "../services/agendaService";

gsap.registerPlugin(ScrollTrigger);

const formatFecha = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AgendaSection = () => {
  const [fechas, setFechas] = useState([]);
  const sectionRef = useRef(null);

  // 🔁 Escuchar cambios en Firestore
  useEffect(() => {
    const unsub = listenAgenda(setFechas);
    return () => unsub();
  }, []);

  // 🎬 Animación con GSAP al hacer scroll
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

      gsap.from(".agenda-item", {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="agenda"
      ref={sectionRef}
      className="py-16 px-4 max-w-6xl mx-auto"
    >
      <h2 className="text-sm tracking-[0.3em] uppercase text-zinc-400 mb-2">
        Agenda
      </h2>
      <h3 className="text-3xl md:text-4xl font-semibold mb-6">
        Próximas presentaciones
      </h3>
      <p className="text-sm text-zinc-400 mb-8 max-w-xl">
        Fechas actualizadas en tiempo real desde el panel de administración.
        Aquí encuentras los shows de JULYOS como solista y con TURROMANTIKOS.
      </p>

      {fechas.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Aún no hay fechas cargadas. Vuelve pronto para ver la próxima gira.
        </p>
      ) : (
        <div className="space-y-3">
          {fechas.map((f) => (
            <div
              key={f.id}
              className="agenda-item flex flex-col md:flex-row md:items-center justify-between gap-3 border border-zinc-800 rounded-2xl px-4 py-3 bg-zinc-900/60"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">
                  {formatFecha(f.fecha)}
                </p>
                <p className="text-sm md:text-base font-medium">
                  {f.lugar || "Lugar por confirmar"}
                </p>
                <p className="text-xs text-zinc-400">
                  {f.ciudad || "Ciudad por confirmar"}
                </p>
                {f.descripcion && (
                  <p className="text-xs text-zinc-400 mt-1">{f.descripcion}</p>
                )}
              </div>
              <div className="text-xs text-zinc-400 md:text-right">
                <p>Entradas próximamente</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AgendaSection;
