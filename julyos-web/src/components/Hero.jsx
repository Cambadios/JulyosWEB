// src/components/Hero.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import HeroScene from "../components/HeroScene"; // este será el 3D con Three.js (lo hacemos abajo)

const Hero = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".hero-title-line",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".hero-text",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".hero-cta",
          {
            y: 10,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.3"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden pt-28 pb-20 px-4 max-w-6xl mx-auto"
    >
      {/* Fondo 3D con Three.js */}
      <HeroScene />

      {/* Capa de contenido encima */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/50 bg-purple-500/10 text-[11px] uppercase tracking-[0.25em] text-purple-200 mb-4">
            <span>JULYOS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Bolivia</span>
          </div>

          <h1 className="space-y-1 text-4xl md:text-5xl font-semibold leading-tight">
            <div className="hero-title-line">Trap sentimental</div>
            <div className="hero-title-line text-purple-400">
              & TURROMANTIKOS vibes
            </div>
          </h1>

          <p className="hero-text mt-4 text-sm md:text-base text-zinc-300 max-w-md">
            Música urbana desde Bolivia, mezclando trap, romanticismo y calle.
            Shows en vivo, lanzamientos y todo el universo de JULYOS en un solo lugar.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#musica"
              className="hero-cta inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-xs uppercase tracking-[0.25em]"
            >
              Escuchar ahora
            </a>
            <a
              href="#agenda"
              className="hero-cta inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-zinc-600 hover:border-purple-400 text-xs uppercase tracking-[0.25em]"
            >
              Ver agenda
            </a>
          </div>
        </div>

        {/* Tarjeta de info derecha la puedes dejar como ya la tenías */}
        <div className="relative">
          <div className="absolute -inset-8 bg-purple-500/20 blur-3xl opacity-60" />
          <div className="relative bg-zinc-900/70 border border-zinc-700/80 rounded-3xl p-6 backdrop-blur-xl">
            <p className="text-xs text-zinc-400 mb-2">Próximo show</p>
            <p className="text-lg font-semibold mb-1">
              TURROMANTIKOS • Santa Cruz
            </p>
            <p className="text-sm text-zinc-300 mb-4">
              Viernes 05 Ene 2026 · 22:00
            </p>
            <p className="text-xs text-zinc-400">
              Actualizado en tiempo real desde el panel de administración.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
