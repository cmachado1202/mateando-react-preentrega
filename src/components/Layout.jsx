import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  const titulo = ({ '/': 'Inicio', '/productos': 'Catálogo', '/carrito': 'Carrito', '/gestion': 'Gestión', '/ingreso': 'Ingresar' })[pathname] || (pathname.startsWith('/producto/') ? 'Producto' : 'Página no encontrada');
  return (
    <>
      <Helmet><title>{titulo} · Mateando</title><meta name="description" content={titulo + " de Mateando, tienda de mates y accesorios."} /></Helmet>
      <ToastContainer /><Header />
      <main className="contenedor"><Outlet /></main>
      <Footer />
    </>
  );
}
