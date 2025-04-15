import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Enviando...");

    try {
      const response = await fetch("https://donde-como-hoy-backend.onrender.com/restaurantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formulario)
      });

      if (response.ok) {
        setMensaje("✅ Restaurante registrado correctamente.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMensaje("❌ Error al registrar el restaurante.");
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Registra tu restaurante</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del restaurante"
            value={formulario.nombre}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formulario.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formulario.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Registrarse
          </button>
        </form>
        {mensaje && <p className="mt-4 text-center text-sm text-green-600">{mensaje}</p>}
      </div>
    </div>
  );
}
