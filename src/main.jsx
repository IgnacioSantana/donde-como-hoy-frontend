import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Signup from './pages/Signup'
import TestRegistro from './pages/TestRegistro';
import Panel from './pages/Panel'; // arriba con los imports

// Dentro de <Routes>...
<Route path="/panel" element={<Panel />} />

<Route path="/test" element={<TestRegistro />} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
