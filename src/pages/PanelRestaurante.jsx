
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function PanelRestaurante() {
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [posicionY, setPosicionY] = useState(50);
  const [imagen, setImagen] = useState(localStorage.getItem("imagen") || "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1650&q=80");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [menus, setMenus] = useState({});

  const contenedorImagen = useRef(null);
  const arrastrando = useRef(false);

  useEffect(() => {
    const datos = localStorage.getItem("restaurante");
    if (!datos) {
      navigate("/login");
    } else {
      setRestaurante(JSON.parse(datos));
    }

    const posGuardada = localStorage.getItem("posicionY");
    if (posGuardada) setPosicionY(Number(posGuardada));
  }, [navigate]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
        localStorage.setItem("imagen", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e) => {
    if (arrastrando.current && contenedorImagen.current) {
      const bounds = contenedorImagen.current.getBoundingClientRect();
      const relativeY = e.clientY - bounds.top;
      const percentage = Math.min(Math.max((relativeY / bounds.height) * 100, 0), 100);
      setPosicionY(percentage);
      localStorage.setItem("posicionY", percentage);
    }
  };

  const fechaKey = fechaSeleccionada.toISOString().split("T")[0];
  const menuDelDia = menus[fechaKey];

  if (!restaurante) return null;

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-extrabold">Bienvenido, {restaurante.nombre}</h1>
          <a href="/crear-menu" className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">Crear Menú</a>
        </div>
        <p className="mb-4 text-gray-600">Aquí puedes crear y gestionar tus menús del día.</p>

        <div
          ref={contenedorImagen}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onMouseDown={() => arrastrando.current = true}
          onMouseUp={() => arrastrando.current = false}
          onMouseLeave={() => arrastrando.current = false}
          onMouseMove={handleMouseMove}
          className="mb-8 w-full h-64 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 relative cursor-grab"
        >
          <img
            src={imagen}
            alt="Imagen de portada"
            className="w-full h-full object-cover"
            style={{ objectPosition: `center ${posicionY}%` }}
            draggable={false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Calendar
              onChange={setFechaSeleccionada}
              value={fechaSeleccionada}
              className="rounded-lg shadow border border-gray-200 p-2"
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-bold mb-3">Menú del día: {fechaKey}</h2>
            {menuDelDia ? (
              <div className="space-y-2">
                <p><strong>Precio:</strong> {menuDelDia.precio}€</p>
                <p><strong>Primeros:</strong> {menuDelDia.primeros.join(', ')}</p>
                <p><strong>Segundos:</strong> {menuDelDia.segundos.join(', ')}</p>
                <p><strong>Incluye:</strong> {Object.entries(menuDelDia.incluye).filter(([, val]) => val).map(([k]) => k).join(', ') || 'Nada'}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Menú no disponible para esta fecha.</p>
            )}
          </div>
        </div>

        {mensaje && <p className="mt-6 text-center text-sm text-green-600">{mensaje}</p>}
      </div>
    </div>
  );
}
