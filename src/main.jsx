import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Signup from './pages/Signup';

<Route path="/signup" element={<Signup />} />


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
