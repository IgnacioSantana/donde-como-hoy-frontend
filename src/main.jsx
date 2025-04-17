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
import TestRegistro from './pages/TestRegistro'; // ✅ este era el que faltaba
