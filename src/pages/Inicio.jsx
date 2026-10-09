import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <section className="seccion">
      <div className="hero">
        <div><span className="etiqueta">El momento del mate</span><h1>Siempre hay tiempo<br />para un buen mate.</h1><p>Elegí tu compañero para las mañanas, las tardes de estudio y las charlas que se hacen largas.</p><Link className="boton" to="/productos">Explorar productos</Link></div>
        <img src="/images/mate.svg" alt="Ilustración de un mate con bombilla" width="400" height="320" />
      </div>
      <div className="presentacion"><h2>Lo que hace especial a Mateando</h2><p>Una selección simple de mates y accesorios, pensada para que encuentres todo en un mismo lugar.</p><div className="beneficios"><article><h3>Para todos los gustos</h3><p>Modelos tradicionales y prácticos para todos los días.</p></article><article><h3>Todo para tu ronda</h3><p>Termos, bombillas y yerberos para completar el equipo.</p></article><article><h3>Elegí con tranquilidad</h3><p>Consultá las características y el precio en cada detalle.</p></article></div></div>
    </section>
  );
}
