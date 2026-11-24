import { Link } from 'react-router-dom';
import { useCarrito } from '../context/Carrito';
const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
export default function Carrito() {
  const { items, eliminar, vaciar } = useCarrito();
  return <section className="seccion"><span className="etiqueta">Tu selección</span><h1>Carrito de compras</h1>
    {items.length ? <><ul>{items.map(p => <li key={p.id}><strong>{p.nombre}</strong> · {p.cantidad} × {moneda.format(p.precio)} = {moneda.format(p.cantidad*p.precio)} <button onClick={() => eliminar(p.id)}>Quitar {p.nombre}</button></li>)}</ul>
    <p>Total <strong>{moneda.format(items.reduce((s,p) => s+p.precio*p.cantidad, 0))}</strong></p><button onClick={vaciar}>Vaciar carrito</button></> : <p>Todavía no hay productos en el carrito.</p>}
    <Link className="boton" to="/productos">Ver productos</Link></section>;
}
