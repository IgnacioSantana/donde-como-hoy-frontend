export default function TestRegistro() {
  const handleRegistro = async () => {
    const nuevoRestaurante = {
      nombre: "Test Ignacio",
      email: "testignacio@email.com",
      password: "123456"
    };

    const response = await fetch("https://donde-como-hoy-backend.onrender.com/restaurantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoRestaurante)
    });

    const resultado = await response.json();
    alert("Resultado: " + JSON.stringify(resultado));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <button
        onClick={handleRegistro}
        className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-700"
      >
        Test Registro Automático
      </button>
    </div>
  );
}
