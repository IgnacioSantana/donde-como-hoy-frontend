import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PanelRestaurante from './pages/PanelRestaurante'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CrearMenu from './pages/CrearMenu'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/panel" element={<PanelRestaurante />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/crear-menu" element={<CrearMenu />} />
        <Route path="/" element={
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-10">
    <img src="/logo.png" className="w-60 h-60" alt="Logo" />
    <div className="flex gap-4 mt-4">
      <a href="/login" className="bg-black text-white px-4 py-2 rounded">Iniciar sesión</a>
      <a href="/signup" className="border border-black px-4 py-2 rounded">Registrarse</a>
    </div>
  </div>
} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
