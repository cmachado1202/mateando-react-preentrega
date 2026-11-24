import { Link, useParams } from 'react-router-dom';
import { useCatalogo } from '../context/Catalogo';
import { Agregar } from '../context/Carrito';
import { Helmet } from 'react-helmet';

export default function Producto() {
  const { id } = useParams();
  const { productos, cargando, error } = useCatalogo();
  const producto = productos.find(p => String(p.id) === id);
  return (
    <section className="seccion">
      <Link className="volver" to="/productos">← Volver al catálogo</Link>
      {cargando ? <p role="status">Cargando producto...</p> : error ? <p role="alert">{error}</p> : !producto ? <h1>Producto no encontrado</h1> : (
        <div className="detalle"><Helmet><title>{producto.nombre} · Mateando</title><meta name="description" content={producto.descripcionCorta} /></Helmet>
          <img src={producto.imagen} alt={producto.nombre} width="400" height="320" />
          <div><span className="etiqueta">{producto.categoria}</span><h1>{producto.nombre}</h1><p className="precio">{producto.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })}</p><p>{producto.descripcion}</p><h2>Características</h2><ul>{producto.caracteristicas.map(caracteristica => <li key={caracteristica}>{caracteristica}</li>)}</ul><p>Stock disponible: {producto.stock} unidades</p><Agregar producto={producto} /><Link className="boton secundario" to="/productos">Seguir viendo productos</Link></div>
        </div>
      )}
    </section>
  );
}
