import { Link } from 'react-router-dom';
export default function NoEncontrado() {
  return <section className="seccion"><h1>Página no encontrada</h1><p>La dirección que buscás no existe.</p><Link className="boton" to="/">Volver al inicio</Link></section>;
}
