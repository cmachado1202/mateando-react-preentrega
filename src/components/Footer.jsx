const equipo = [
  { nombre: 'Carolina', tarea: 'Atención al cliente', iniciales: 'CM' },
  { nombre: 'Lucía', tarea: 'Preparación de pedidos', iniciales: 'LC' },
  { nombre: 'Martín', tarea: 'Selección de productos', iniciales: 'MR' }
];

export default function Footer() {
  return (
    <footer>
      <div className="contenedor">
        <div className="footer-info">
          <div><h2>Mateando</h2><p>Un buen mate, todos los días.</p><p>Tienda ficticia para un proyecto educativo.</p></div>
          <div><h3>Contacto</h3><p>Buenos Aires, Argentina</p><p>hola@mateando.example</p><p>Lunes a viernes de 10 a 18 h</p></div>
        </div>
        <h3>Nuestro equipo</h3>
        <div className="equipo">
          {equipo.map(persona => (
            <article className="persona" key={persona.nombre}>
              <span className="avatar" aria-hidden="true">{persona.iniciales}</span>
              <div><h4>{persona.nombre}</h4><p>{persona.tarea}</p></div>
            </article>
          ))}
        </div>
        <p className="copyright">© 2026 Mateando. Imágenes ilustrativas. No se realizan ventas ni se recopilan datos personales.</p>
      </div>
    </footer>
  );
}
