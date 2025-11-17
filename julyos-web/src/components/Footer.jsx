export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-900/60 mt-10 py-6 text-center text-xs text-gray-500">
      <p>
        © {year} JULYOS • Todos los derechos reservados
      </p>
      <p className="mt-1 text-[0.65rem]">
        Sitio desarrollado por Camba 😎
      </p>
    </footer>
  );
}
