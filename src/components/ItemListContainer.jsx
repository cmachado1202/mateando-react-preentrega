import { useEffect, useState } from 'react';
import Item from './Item';

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  useEffect(() => {
    const controlador = new AbortController();
    fetch('/productos.json', { signal: controlador.signal })
      .then(respuesta => {
        if (!respuesta.ok) throw new Error('No se pudo cargar el catálogo.');
        return respuesta.json();
      })
      .then(datos => setProductos(datos))
      .catch(error => {
        if (error.name !== 'AbortError') setError('No pudimos cargar los productos. Volvé a intentar más tarde.');
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargando(false);
      });
    return () => controlador.abort();
  }, []);

  const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];
  const visibles = categoria === 'Todos' ? productos : productos.filter(producto => producto.categoria === categoria);

  return (
    <section className="seccion">
      <span className="etiqueta">Para tu próxima ronda</span>
      <h1>Nuestros productos</h1>
      <p className="intro">Mates, termos y accesorios para compartir.</p>
      {cargando && <p role="status">Cargando productos...</p>}
      {error && <p role="alert">{error}</p>}
      {!cargando && !error && (
        <>
          <div className="filtros" aria-label="Filtrar por categoría">
            {categorias.map(nombre => <button key={nombre} type="button" aria-pressed={categoria === nombre} onClick={() => setCategoria(nombre)}>{nombre}</button>)}
          </div>
          <p className="cantidad">{visibles.length} productos</p>
          <div className="catalogo">{visibles.map(producto => <Item key={producto.id} producto={producto} />)}</div>
          {visibles.length === 0 && <p>No hay productos para mostrar.</p>}
        </>
      )}
    </section>
  );
}
