// src/components/MusicSection.jsx
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { listenCanciones } from "../services/cancionesService";

gsap.registerPlugin(ScrollTrigger);

// Convierte una URL /embed/... a /watch?v=... para abrir en YouTube
const getWatchUrl = (url) => {
  if (!url) return "#";

  // Si ya es formato watch, lo dejamos
  if (url.includes("watch")) return url;

  const match = url.match(/embed\/([^?&]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }

  return url;
};

const MusicSection = () => {
  const [canciones, setCanciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const sectionRef = useRef(null);

  // 🔁 Escuchar canciones en tiempo real desde Firestore
  useEffect(() => {
    const unsub = listenCanciones((data) => {
      setCanciones(data);
      setCargando(false);
    });

    return () => unsub();
  }, []);

  // 🎬 Animación de sección + cards con GSAP
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animar toda la sección
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

      // Animar cada card de canción
      gsap.from(".music-item", {
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
  }, [canciones.length]);

  return (
    <section
      id="musica"
      ref={sectionRef}
      className="py-16 px-4 max-w-6xl mx-auto"
    >
      <h2 className="text-sm tracking-[0.3em] uppercase text-zinc-400 mb-2">
        Música
      </h2>
      <h3 className="text-3xl md:text-4xl font-semibold mb-6">
        Últimos lanzamientos
      </h3>
      <p className="text-sm text-zinc-400 mb-8 max-w-xl">
        Disfruta los temas más recientes de JULYOS. Esta sección se actualiza
        desde el panel de administración, para que los fans siempre vean lo más
        nuevo.
      </p>

      {/* Estado cargando */}
      {cargando && (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-zinc-900/60 border border-zinc-800 rounded-3xl p-4 md:p-5"
            >
              <div className="h-4 w-32 bg-zinc-800 rounded mb-3" />
              <div className="h-3 w-48 bg-zinc-800 rounded mb-4" />
              <div className="h-40 bg-zinc-900 rounded-2xl" />
            </div>
          ))}
        </div>
      )}

      {/* Sin canciones */}
      {!cargando && canciones.length === 0 && (
        <p className="text-sm text-zinc-500">
          Aún no hay canciones cargadas. Vuelve pronto para escuchar los
          próximos lanzamientos.
        </p>
      )}

      {/* Lista de canciones */}
      {!cargando && canciones.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {canciones.map((tema) => (
            <article
              key={tema.id}
              className="music-item bg-zinc-900/60 border border-zinc-800 rounded-3xl p-4 md:p-5 flex flex-col gap-3"
            >
              <div>
                <h4 className="text-lg font-medium mb-1">
                  {tema.titulo || "Sin título"}
                </h4>
                {tema.descripcion && (
                  <p className="text-sm text-zinc-400">
                    {tema.descripcion}
                  </p>
                )}
              </div>

              {tema.youtubeUrl && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-black/60 mt-2">
                  <iframe
                    src={tema.youtubeUrl}
                    title={tema.titulo || "Video de JULYOS"}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              {!tema.youtubeUrl && (
                <p className="text-xs text-zinc-500">
                  No se ha configurado todavía el enlace de YouTube para este
                  tema.
                </p>
              )}

              {tema.youtubeUrl && (
                <a
                  href={getWatchUrl(tema.youtubeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 text-xs text-purple-300 hover:text-purple-200 underline underline-offset-4"
                >
                  Abrir en YouTube
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MusicSection;
