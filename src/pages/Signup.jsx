import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [mostrarToast, setMostrarToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Enviando...");
    setMostrarToast(false);

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
        setMostrarToast(true);
        setTimeout(() => {
          setMostrarToast(false);
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || "❌ Error al registrar el restaurante.";
        setMensaje(`❌ ${errorMsg}`);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor.");
      setMostrarToast(true);
      setTimeout(() => setMostrarToast(false), 3000);
    }
  };

  return (
    <>
      {mostrarToast && (
        <div className="fixed top-6 right-6 bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-3 text-sm text-gray-800 z-50">
          {mensaje}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <img src="/logo.png" alt="Logo ¿Dónde Como Hoy?" className="w-48 mx-auto mb-6" />
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
              className={`w-full py-2 rounded font-semibold transition ${
                mensaje === "Enviando..." ? "bg-gray-400 text-white" : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={mensaje === "Enviando..."}
            >
              {mensaje === "Enviando..." ? "Enviando..." : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
