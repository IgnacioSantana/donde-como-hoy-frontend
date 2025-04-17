import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formulario, setFormulario] = useState({
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Verificando...");
    setTipoMensaje("");

    try {
      const response = await fetch("https://donde-como-hoy-backend.onrender.com/restaurantes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formulario)
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("restaurante", JSON.stringify({
          id: data.restauranteId,
          nombre: data.nombre
        }));

        setMensaje("✅ Inicio de sesión exitoso.");
        setTipoMensaje("exito");

        setTimeout(() => navigate("/panel"), 1500);
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || "❌ Credenciales incorrectas.";
        setMensaje(`❌ ${errorMsg}`);
        setTipoMensaje("error");
      }
    } catch (error) {
      setMensaje("❌ Error al conectar con el servidor.");
      setTipoMensaje("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <img src="/logo.png" alt="Logo ¿Dónde Como Hoy?" className="w-48 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="submit"
              className={`w-full py-2 rounded font-semibold transition ${
                mensaje === "Verificando..." ? "bg-gray-400 text-white" : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={mensaje === "Verificando..."}
            >
              {mensaje === "Verificando..." ? "Verificando..." : "Iniciar sesión"}
            </button>
            <Link
              to="/signup"
              className="w-full text-center border border-black text-black py-2 rounded font-semibold hover:bg-gray-100 transition"
            >
              Registrarse
            </Link>
          </div>

          {mensaje && (
            <p
              className={`text-sm text-center mt-2 ${
                tipoMensaje === "exito"
                  ? "text-green-600"
                  : tipoMensaje === "error"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
