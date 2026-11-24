import { NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { useAuth } from '../context/Auth';
import { useCarrito } from '../context/Carrito';

export default function NavBar() {
  const { usuario } = useAuth();
  const { cantidad } = useCarrito();
  const navegar = useNavigate();
  async function salir() {
    try { await signOut(auth); navegar('/'); }
    catch { toast.error('No se pudo cerrar la sesión.'); }
  }
  return <nav aria-label="Navegación principal"><NavLink to="/">Inicio</NavLink><NavLink to="/productos">Productos</NavLink>
    <NavLink to="/carrito"><FiShoppingBag aria-hidden /> Carrito ({cantidad})</NavLink>
    {usuario ? <><NavLink to="/gestion">Gestión</NavLink><button onClick={salir}>Salir</button></> : <NavLink to="/ingreso">Ingresar</NavLink>}</nav>;
}
