
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://donde-como-hoy-backend.onrender.com/restaurantes");
      const data = await response.json();

      const restauranteEncontrado = data.find(
        (r) => r.email === email && r.password === password
      );

      if (restauranteEncontrado) {
        localStorage.setItem("restaurante", JSON.stringify(restauranteEncontrado));
        navigate("/panel");
      } else {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 font-semibold"
          >
            Entrar al panel
          </button>
        </form>
      </div>
    </div>
  );
}
