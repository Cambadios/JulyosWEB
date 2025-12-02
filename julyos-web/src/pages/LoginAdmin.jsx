import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginAdmin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/julyos-admin");
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas o error al iniciar sesión.");
    }
  };

  return (
    <div className="flex items-center justify-center pt-24 pb-10">
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2 text-center tracking-[0.25em] uppercase">
          JULYOS ADMIN
        </h1>
        <p className="text-sm text-zinc-400 text-center mb-6">
          Ruta privada para actualizar contenido del sitio.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Correo admin</label>
            <input
              type="email"
              className="w-full rounded-xl bg-zinc-950/80 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@julyos.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-xl bg-zinc-950/80 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors py-2 text-sm font-medium tracking-[0.2em] uppercase"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
