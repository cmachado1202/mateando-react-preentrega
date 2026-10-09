import { Link } from 'react-router-dom';

export default function Item({ producto }) {
  return (
    <article className="tarjeta">
      <img src={producto.imagen} alt={producto.nombre} loading="lazy" width="400" height="320" />
      <div className="tarjeta-info">
        <span className="categoria">{producto.categoria}</span>
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcionCorta}</p>
        <strong className="precio">{producto.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })}</strong>
        <Link className="boton secundario" to={`/producto/${producto.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
