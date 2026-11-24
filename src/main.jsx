import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { AuthProvider } from './context/Auth';
import { CarritoProvider } from './context/Carrito';
import { CatalogoProvider } from './context/Catalogo';

const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider><CatalogoProvider><CarritoProvider><App /></CarritoProvider></CatalogoProvider></AuthProvider>
    </Router>
  </React.StrictMode>
);
