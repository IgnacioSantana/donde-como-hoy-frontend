import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Panel from './pages/PanelRestaurante';
import RutaProtegida from './components/RutaProtegida';
import CrearMenu from './pages/CrearMenu';
import TestRegistro from './pages/TestRegistro'; // ✅ ¡Ya está!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/panel"
          element={
            <RutaProtegida>
              <Panel />
            </RutaProtegida>
          }
        />
        <Route
          path="/crear-menu"
          element={
            <RutaProtegida>
              <CrearMenu />
            </RutaProtegida>
          }
        />
        <Route path="/test" element={<TestRegistro />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
