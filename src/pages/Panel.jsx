import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Panel() {
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);

  useEffect(() => {
    const datos = localStorage.getItem("restaurante");
    if (datos) {
      setRestaurante(JSON.parse(datos));
    } else {
      navigate("/login");
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("restaurante");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center">
      <div>
        <img src="/logo.png" alt="Logo ¿Dónde Como Hoy?" className="w-40 mx-auto mb-6" />
        {restaurante ? (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Hola, <span className="text-blue-600">{restaurante.nombre}</span>
            </h1>
            <p className="text-gray-600 mb-6">Este es tu panel de restaurante.</p>
            <button
              onClick={cerrarSesion}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <p className="text-gray-600">Cargando...</p>
        )}
      </div>
    </div>
  );
  <Route
  path="/panel"
  element={
    <RutaProtegida>
      <Panel />
    </RutaProtegida>
  }
/>

}
