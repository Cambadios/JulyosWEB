// src/components/GallerySection.jsx
import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { listenGaleria } from "../services/galeriaService";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionado, setSeleccionado] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const unsub = listenGaleria((data) => {
      setItems(data);
      setCargando(false);
    });
    return () => unsub();
  }, []);

  // Animaciones GSAP
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

      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      id="fotos"
      ref={sectionRef}
      className="py-16 px-4 max-w-6xl mx-auto"
    >
      <h2 className="text-sm tracking-[0.3em] uppercase text-zinc-400 mb-2">
        Galería
      </h2>
      <h3 className="text-3xl md:text-4xl font-semibold mb-6">
        Momentos de JULYOS
      </h3>
      <p className="text-sm text-zinc-400 mb-8 max-w-xl">
        Shows en vivo, estudio, sesiones de fotos y momentos con TURROMANTIKOS.
        Esta galería se actualiza desde el panel de administración.
      </p>

      {cargando && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-zinc-900/60 border border-zinc-800 rounded-2xl aspect-[4/3]"
            />
          ))}
        </div>
      )}

      {!cargando && items.length === 0 && (
        <p className="text-sm text-zinc-500">
          Aún no hay fotos cargadas en la galería. Vuelve pronto.
        </p>
      )}

      {!cargando && items.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              className="gallery-item group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 aspect-[4/3]"
              onClick={() => setSeleccionado(item)}
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.titulo || "Imagen de JULYOS"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[11px] text-purple-300 uppercase tracking-[0.18em] mb-1">
                  {item.tipo || "Galería"}
                </p>
                <p className="text-sm font-medium text-zinc-50 line-clamp-2 text-left">
                  {item.titulo || "Sin título"}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal simple para ver la imagen grande */}
      {seleccionado && (
        <div
          className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setSeleccionado(null)}
        >
          <div
            className="max-w-3xl w-full bg-zinc-950/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black">
              {seleccionado.imageUrl && (
                <img
                  src={seleccionado.imageUrl}
                  alt={seleccionado.titulo || "Imagen de JULYOS"}
                  className="w-full max-h-[70vh] object-contain"
                />
              )}
            </div>
            <div className="p-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] text-purple-300 uppercase tracking-[0.18em] mb-1">
                  {seleccionado.tipo || "Galería"}
                </p>
                <p className="text-sm text-zinc-100">
                  {seleccionado.titulo || "Sin título"}
                </p>
              </div>
              <button
                onClick={() => setSeleccionado(null)}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
