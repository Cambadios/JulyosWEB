// src/components/HeroScene.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const HeroScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 🎬 Escena
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#030014", 1, 15);

    // 🎥 Cámara
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // 🖼️ Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fondo transparente
    container.appendChild(renderer.domElement);

    // 🔷 Geometría principal (torus knot)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 220, 32);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#a855f7"),
      metalness: 0.6,
      roughness: 0.2,
      emissive: new THREE.Color("#7c3aed"),
      emissiveIntensity: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ✨ Partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 12;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color("#c4b5fd"),
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 💡 Luces
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight("#a855f7", 1.5);
    pointLight.position.set(3, 3, 4);
    scene.add(pointLight);

    // ⏱️ Animación inicial
    mesh.scale.set(0, 0, 0);
    gsap.to(mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.4,
      ease: "back.out(1.7)",
    });

    // 🧠 Variables para interacción
    const targetRotation = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 a 1
      const y = (e.clientY - rect.top) / rect.height; // 0 a 1

      // Normalizamos a -1 a 1
      const normX = x * 2 - 1;
      const normY = y * 2 - 1;

      // Objetivo de rotación/posición en base al mouse
      const rotY = normX * 0.5; // izquierda/derecha
      const rotX = -normY * 0.3; // arriba/abajo

      const camX = normX * 0.6;
      const camY = -normY * 0.4;

      // Suavizamos con GSAP
      gsap.to(targetRotation, {
        x: rotX,
        y: rotY,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(targetCamera, {
        x: camX,
        y: camY,
        duration: 1,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    // 🎞️ Loop de animación
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Rotación base + interactiva
      mesh.rotation.y = elapsed * 0.25 + targetRotation.y;
      mesh.rotation.x = Math.sin(elapsed * 0.4) * 0.2 + targetRotation.x;

      // Pequeño movimiento de cámara
      camera.position.x = targetCamera.x;
      camera.position.y = targetCamera.y;
      camera.lookAt(0, 0, 0);

      particles.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // 📏 Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 🧹 Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);

      geometry.dispose();
      particlesGeometry.dispose();
      material.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 opacity-70 pointer-events-auto"
    />
  );
};

export default HeroScene;
