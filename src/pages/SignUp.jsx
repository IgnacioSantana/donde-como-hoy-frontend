
import { useState } from "react";

export default function SignUp() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje("");

    try {
      const res = await fetch("https://donde-como-hoy-backend.onrender.com/restaurantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (res.ok) {
        setMensaje("✅ Restaurante registrado correctamente.");
        setNombre("");
        setEmail("");
        setPassword("");
      } else {
        const error = await res.text();
        setMensaje("❌ Error: " + error);
      }
    } catch {
      setMensaje("❌ Error al conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white text-gray-800">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded shadow border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center">Registra tu restaurante</h1>

        <input
          type="text"
          placeholder="Nombre del restaurante"
          className="mb-4 w-full p-3 border border-gray-300 rounded focus:outline-none"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full p-3 border border-gray-300 rounded focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="mb-6 w-full p-3 border border-gray-300 rounded focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-semibold hover:opacity-80 transition"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Registrarse"}
        </button>

        {mensaje && <p className="mt-4 text-center text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
