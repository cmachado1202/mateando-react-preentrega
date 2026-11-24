import { useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { useCatalogo } from '../context/Catalogo';
import Item from './Item';

const Buscador = styled.input`
  width: min(100%, 32rem);
  padding: .65rem .9rem;
  border: 1px solid #788675;
  border-radius: .5rem;
`;
export default function ItemListContainer() {
  const { productos, cargando, error } = useCatalogo();
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];
  const visibles = productos.filter(p => (categoria === 'Todos' || p.categoria === categoria) && p.nombre.toLocaleLowerCase('es').includes(busqueda.trim().toLocaleLowerCase('es')));

  const paginas = Math.ceil(visibles.length / 12);
  const actual = Math.min(pagina, paginas || 1);
  return (
    <section className="seccion">
      <span className="etiqueta">Para tu próxima ronda</span>
      <h1>Nuestros productos</h1>
      <p className="intro">Mates, termos y accesorios para compartir.</p>
      {cargando && <p role="status"><Spinner size="sm" /> Cargando productos…</p>}
      {error && <p role="alert">{error}</p>}
      {!cargando && !error && (
        <>
          <label>Buscar por nombre<Buscador type="search" value={busqueda} onChange={e => { setBusqueda(e.target.value); setPagina(1); }} /></label>
          <div className="filtros" aria-label="Filtrar por categoría">
            {categorias.map(nombre => <button key={nombre} type="button" aria-pressed={categoria === nombre} onClick={() => { setCategoria(nombre); setPagina(1); }}>{nombre}</button>)}
          </div>
          <p className="cantidad">{visibles.length} productos</p>
          <Row xs={1} sm={2} lg={3} className="g-3">{visibles.slice((actual-1)*12, actual*12).map(producto => <Col key={producto.id}><Item producto={producto} /></Col>)}</Row>
          {paginas > 1 && <nav aria-label="Páginas"><button disabled={actual === 1} onClick={() => setPagina(actual-1)}>Anterior</button><span>{actual} de {paginas}</span><button disabled={actual === paginas} onClick={() => setPagina(actual+1)}>Siguiente</button></nav>}
          {visibles.length === 0 && <p>No hay productos para mostrar.</p>}
        </>
      )}
    </section>
  );
}
