import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controlador = new AbortController();
    setCargando(true);
    setProducto(null);
    setError('');
    fetch('/productos.json', { signal: controlador.signal })
      .then(respuesta => {
        if (!respuesta.ok) throw new Error('Error al cargar el producto');
        return respuesta.json();
      })
      .then(datos => setProducto(datos.find(item => String(item.id) === id) || null))
      .catch(error => {
        if (error.name !== 'AbortError') setError('No pudimos cargar el producto. Volvé a intentar más tarde.');
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargando(false);
      });
    return () => controlador.abort();
  }, [id]);

  return (
    <section className="seccion">
      <Link className="volver" to="/productos">← Volver al catálogo</Link>
      {cargando ? <p role="status">Cargando producto...</p> : error ? <p role="alert">{error}</p> : !producto ? <h1>Producto no encontrado</h1> : (
        <div className="detalle">
          <img src={producto.imagen} alt={producto.nombre} width="400" height="320" />
          <div><span className="etiqueta">{producto.categoria}</span><h1>{producto.nombre}</h1><p className="precio">{producto.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })}</p><p>{producto.descripcion}</p><h2>Características</h2><ul>{producto.caracteristicas.map(caracteristica => <li key={caracteristica}>{caracteristica}</li>)}</ul><p>Stock disponible: {producto.stock} unidades</p><p className="nota">La compra y el carrito funcional se incorporarán en la entrega final.</p><Link className="boton secundario" to="/productos">Seguir viendo productos</Link></div>
        </div>
      )}
    </section>
  );
}
