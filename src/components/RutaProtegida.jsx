import { Navigate } from "react-router-dom";

export default function RutaProtegida({ children }) {
  const sesion = localStorage.getItem("restaurante");

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
