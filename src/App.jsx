import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center p-8">
      <div>
        <img src="/logo.png" alt="Logo Dónde Como Hoy" className="mx-auto w-64 mb-6" />
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/signup"
            className="bg-white border border-black text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Registra tu restaurante
          </Link>
        </div>
      </div>
    </div>
  );
}
