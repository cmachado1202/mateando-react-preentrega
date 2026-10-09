import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Navegación principal">
      <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}>Inicio</Link>
      <Link to="/productos" aria-current={pathname.startsWith('/producto') ? 'page' : undefined}>Productos</Link>
      <Link to="/carrito" aria-current={pathname === '/carrito' ? 'page' : undefined}>Carrito</Link>
    </nav>
  );
}
