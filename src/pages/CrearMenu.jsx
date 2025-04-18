import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearMenu() {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [precio, setPrecio] = useState("");
  const [primeros, setPrimeros] = useState(["", "", "", ""]);
  const [segundos, setSegundos] = useState(["", "", "", ""]);
  const [incluye, setIncluye] = useState({ pan: true, bebida: true, postre: false, cafe: false });
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurante = JSON.parse(localStorage.getItem("restaurante"));
if (!restaurante || (!restaurante._id && !restaurante.id)) {
  setMensaje("❌ Restaurante no autenticado");
  return;
}
    
    if (!restaurante || (!restaurante._id && !restaurante.id)) {
  setMensaje("❌ Restaurante no autenticado");
  return;
}
    
    const nuevoMenu = {
  restauranteId: restaurante._id || restaurante.id,
  fecha,
  precio,
  primeros: primeros.filter(p => p.trim() !== ""),
  segundos: segundos.filter(s => s.trim() !== ""),
  incluye
};

    try {
      const response = await fetch("https://donde-como-hoy-backend.onrender.com/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoMenu)
      });

      if (response.ok) {
        setMensaje("✅ Menú guardado con éxito");
        setTimeout(() => navigate("/panel"), 1500);
      } else {
        setMensaje("❌ Error al guardar el menú");
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor");
    }
  };

  const handleCheckbox = (e) => {
    setIncluye({ ...incluye, [e.target.name]: e.target.checked });
  };

  const updatePlato = (arr, index, value, setter) => {
    const nuevos = [...arr];
    nuevos[index] = value;
    setter(nuevos);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow border border-gray-200">
        <img src="/logo.png" alt="Logo ¿Dónde Como Hoy?" className="w-32 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-center mb-6">Crear Menú del Día</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">📅 Fecha del menú</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">💶 Precio</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">€</span>
              <input
                type="text"
                placeholder="Ej: 12.50"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 pl-8 shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2 text-lg">🥗 Primeros Platos</h2>
            <div className="space-y-2">
              {primeros.map((plato, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Plato ${i + 1}`}
                  value={plato}
                  onChange={(e) => updatePlato(primeros, i, e.target.value, setPrimeros)}
                  className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mt-4 mb-2 text-lg">🍖 Segundos Platos</h2>
            <div className="space-y-2">
              {segundos.map((plato, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Plato ${i + 1}`}
                  value={plato}
                  onChange={(e) => updatePlato(segundos, i, e.target.value, setSegundos)}
                  className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mt-6 mb-2 text-lg">🎁 Extras incluidos en el menú</h2>
            <div className="flex flex-wrap gap-4">
              {Object.keys(incluye).map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name={item} checked={incluye[item]} onChange={handleCheckbox} />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* BLOQUE DE BOTONES */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Guardar Menú
            </button>
            <button
              type="button"
              onClick={() => navigate("/panel")}
              className="w-full sm:w-auto border border-black text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              ← Volver al panel
            </button>
          </div>
        </form>

        {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
      </div>
    </div>
  );
}

export default CrearMenu;
