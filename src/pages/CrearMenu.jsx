
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearMenu() {
  const [fecha, setFecha] = useState("");
  const [formulario, setFormulario] = useState({
    precio: '',
    primeros: '',
    segundos: '',
    incluye: { bebida: false, postre: false, cafe: false }
  });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formulario.incluye) {
      setFormulario({
        ...formulario,
        incluye: { ...formulario.incluye, [name]: checked }
      });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurante = JSON.parse(localStorage.getItem("restaurante"));
    if (!restaurante) return;

    const nuevoMenu = {
      restauranteId: restaurante._id,
      fecha,
      precio: formulario.precio,
      primeros: formulario.primeros.split(',').map(p => p.trim()),
      segundos: formulario.segundos.split(',').map(s => s.trim()),
      incluye: formulario.incluye
    };

    try {
      const response = await fetch("https://donde-como-hoy-backend.onrender.com/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoMenu),
      });

      if (response.ok) {
        setMensaje("✅ Menú guardado correctamente");
        setTimeout(() => navigate("/panel"), 1500);
      } else {
        setMensaje("❌ Error al guardar el menú.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de conexión.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Crear nuevo menú</h1>
          <button onClick={() => navigate("/panel")} className="text-sm text-blue-600 underline">Volver al panel</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Fecha</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium">Precio (€)</label>
            <input type="number" name="precio" value={formulario.precio} onChange={handleFormChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block font-medium">Primeros platos (separados por coma)</label>
            <input type="text" name="primeros" value={formulario.primeros} onChange={handleFormChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block font-medium">Segundos platos (separados por coma)</label>
            <input type="text" name="segundos" value={formulario.segundos} onChange={handleFormChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {['bebida', 'postre', 'cafe'].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" name={item} checked={formulario.incluye[item]} onChange={handleFormChange} />
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            ))}
          </div>
          <button type="submit" className="bg-black text-white py-2 px-4 rounded font-semibold hover:opacity-80">
            Guardar menú
          </button>
        </form>
        {mensaje && <p className="mt-4 text-green-600 text-sm">{mensaje}</p>}
      </div>
    </div>
  );
}
