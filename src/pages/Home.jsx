import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white text-gray-800">
      <img src="/logo.png" alt="Logo ¿Dónde Como Hoy?" className="w-48 mb-6" />

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-xs sm:max-w-none">
        <Link
          to="/login"
          className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition text-center"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/signup"
          className="w-full sm:w-auto border border-black text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition text-center"
        >
          Registra tu restaurante
        </Link>
      </div>
    </div>
  );
}
