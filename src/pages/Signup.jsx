
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await fetch("https://donde-como-hoy-backend.onrender.com/restaurantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (response.ok) {
        setMensaje("✅ Restaurante registrado correctamente.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMensaje("❌ Error al registrar el restaurante.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de conexión.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de restaurante</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre del restaurante</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 font-semibold"
          >
            Registrarse
          </button>
        </form>
        {mensaje && <p className="mt-4 text-center text-green-600 text-sm">{mensaje}</p>}
      </div>
    </div>
  );
}
