
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white text-gray-800">
      <img src="/logo.png" alt="Logo ¿Dónde Como Hoy?" className="w-48 mb-6" />
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/login"
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/signup"
          className="border border-black text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Registra tu restaurante
        </Link>
      </div>
    </div>
  );
}
