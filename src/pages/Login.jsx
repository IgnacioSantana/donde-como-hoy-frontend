import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formulario, setFormulario] = useState({
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Verificando...");
    setTipoMensaje("");

    try {
      const response = await fetch("https://donde-como-hoy-backend.onrender.com/restaurantes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formulario)
      });

      if (response.ok) {
        setMensaje("✅ Inicio de sesión exitoso.");
        setTipoMensaje("exito");
        setTimeout(() => navigate("/panel"), 1500); // redirección al panel
