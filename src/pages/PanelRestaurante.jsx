import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { CakeIcon, SparklesIcon, BanknotesIcon } from "@heroicons/react/24/solid";

function PanelRestaurante() {
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [posicionY, setPosicionY] = useState(50);
  const [imagen, setImagen] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [menuDelDia, setMenuDelDia] = useState(null);

  const contenedorImagen = useRef(null);
  const arrastrando = useRef(false);
  const inputArchivo = useRef(null);

  useEffect(() => {
    const datos = localStorage.getItem("restaurante");

    if (datos) {
      const restauranteLocal = JSON.parse(datos);

      fetch(`https://donde-como-hoy-backend.onrender.com/restaurantes/${restauranteLocal._id}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setRestaurante(data);
            if (data.imagen) {
              setImagen(data.imagen);
            }
          } else {
            navigate("/login");
          }
        })
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }

    const posGuardada = localStorage.getItem("posicionY");
    if (posGuardada) setPosicionY(Number(posGuardada));
  }, [navigate]);

  useEffect(() => {
    if (!restaurante) return;
    const fechaKey = fechaSeleccionada.toISOString().split("T")[0];

    fetch(`https://donde-como-hoy-backend.onrender.com/menus/${restaurante._id}/${fechaKey}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setMenuDelDia(data))
      .catch(() => setMenuDelDia(null));
  }, [fechaSeleccionada, restaurante]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const nuevaImagen = reader.result;
        setImagen(nuevaImagen);

        if (restaurante?._id) {
          await fetch(`https://donde-como-hoy-backend.onrender.com/restaurantes/${restaurante._id}/imagen`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagen: nuevaImagen }),
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArchivoManual = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const nuevaImagen = reader.result;
        setImagen(nuevaImagen);

        if (restaurante?._id) {
          await fetch(`https://donde-como-hoy-backend.onrender.com/restaurantes/${restaurante._id}/imagen`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagen: nuevaImagen }),
          });
        }
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

  const handleSalir = async () => {
    if (restaurante?._id && imagen) {
      try {
        await fetch(`https://donde-como-hoy-backend.onrender.com/restaurantes/${restaurante._id}/imagen`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagen }),
        });
      } catch (error) {
        console.error("❌ Error al guardar imagen al salir:", error);
      }
    }

    localStorage.clear();
    navigate("/login");
  };

  const fechaKey = fechaSeleccionada.toLocaleDateString('sv-SE');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <img src="/logo.png" alt="Logo ¿Dónde Como Hoy?" className="w-40 mx-auto mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-2">
          <h1 className="text-4xl font-extrabold text-gray-900">Bienvenido, {restaurante?.nombre}</h1>
          <div className="flex gap-2">
            <Link to="/crear-menu" className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
              Crear Menú
            </Link>
            <button onClick={handleSalir} className="bg-white text-black border border-gray-300 px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
              Salir
            </button>
          </div>
        </div>

        <p className="mb-6 text-gray-600 text-lg">Administra tu restaurante y tus menús de forma fácil y rápida.</p>

        <div
          ref={contenedorImagen}
          onClick={() => inputArchivo.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onMouseDown={() => (arrastrando.current = true)}
          onMouseUp={() => (arrastrando.current = false)}
          onMouseLeave={() => (arrastrando.current = false)}
          onMouseMove={handleMouseMove}
          className="mb-10 w-full h-64 overflow-hidden rounded-xl border-2 border-dashed border-gray-300 relative cursor-pointer shadow-sm"
        >
          {imagen ? (
            <img
              src={imagen}
              alt="Imagen de portada"
              className="w-full h-full object-cover"
              style={{ objectPosition: `center ${posicionY}%` }}
              draggable={false}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
              <ArrowUpTrayIcon className="w-10 h-10 mb-2" />
              <p className="text-sm">Arrastra una imagen o haz clic para subir</p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={inputArchivo}
            onChange={handleArchivoManual}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">📅 Selecciona una fecha</h3>
            <Calendar
              onChange={setFechaSeleccionada}
              value={fechaSeleccionada}
              className="rounded-lg overflow-hidden"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 text-center font-sans">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">MENÚ DEL DÍA</h2>
            <p className="text-sm text-gray-500 mb-6">{new Date(fechaSeleccionada).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

            {menuDelDia ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800 uppercase mb-2 flex items-center justify-center gap-1">
                    <SparklesIcon className="w-5 h-5" /> Entrantes
                  </h3>
                  <ul className="space-y-1 text-gray-700">
                    {menuDelDia.primeros.map((plato, i) => (
                      <li key={i}>{plato}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-indigo-800 uppercase mb-2 flex items-center justify-center gap-1">
                    <BanknotesIcon className="w-5 h-5" /> Principal
                  </h3>
                  <ul className="space-y-1 text-gray-700">
                    {menuDelDia.segundos.map((plato, i) => (
                      <li key={i}>{plato}</li>
                    ))}
                  </ul>
                </div>

                {Object.entries(menuDelDia.incluye).filter(([, val]) => val).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-800 uppercase mb-2 flex items-center justify-center gap-1">
                      <CakeIcon className="w-5 h-5" /> Postres / Extras
                    </h3>
                    <p className="text-gray-700">
                      {Object.entries(menuDelDia.incluye)
                        .filter(([, val]) => val)
                        .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
                        .join(", ")}
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  <p className="text-2xl font-bold text-gray-900">{menuDelDia.precio}€</p>
                  <p className="text-sm text-gray-500 mt-1">Incluye todo lo mencionado</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Menú no disponible para esta fecha.</p>
            )}
          </div>
        </div>

        {mensaje && <p className="mt-6 text-center text-sm text-green-600">{mensaje}</p>}
      </div>
    </div>
  );
}

export default PanelRestaurante;
