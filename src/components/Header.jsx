import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export default function Header() {
  return (
    <header className="header">
      <div className="contenedor encabezado">
        <Link className="marca" to="/">Mateando<span>Tienda de mates</span></Link>
        <NavBar />
      </div>
    </header>
  );
}
