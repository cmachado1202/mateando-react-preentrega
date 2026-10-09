import { Link } from 'react-router-dom';

export default function Carrito() {
  return (
    <section className="seccion carrito">
      <span className="etiqueta">Tu selección</span><h1>Carrito de compras</h1>
      <h2>Todavía no hay productos en el carrito</h2>
      <p>En esta pre-entrega está preparada la vista. La funcionalidad para agregar y quitar productos se sumará en la entrega final con Context API.</p>
      <Link className="boton" to="/productos">Ver productos</Link>
    </section>
  );
}
