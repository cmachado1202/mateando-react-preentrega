import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Modal } from 'react-bootstrap';
import { db } from '../firebase';
import { useCatalogo } from '../context/Catalogo';

const nuevo = { nombre: '', precio: '', stock: 0, categoria: 'Mates', imagen: '/images/mate.svg', descripcion: '', descripcionCorta: '', caracteristicas: [] };
export default function Gestion() {
  const { productos, cargando, error } = useCatalogo();
  const [form, setForm] = useState(nuevo);
  const [borrar, setBorrar] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [mensaje, setMensaje] = useState('');
  async function ejecutar(accion) {
    setMensaje(''); setOcupado(true);
    try { await accion(); setMensaje('Cambio guardado.'); }
    catch { setMensaje('No se pudo guardar. Verificá tu conexión y los permisos de gestión.'); }
    finally { setOcupado(false); }
  }
  function guardar(e) {
    e.preventDefault();
    const { id, ...datos } = form;
    datos.nombre = datos.nombre.trim();
    datos.precio = Number(datos.precio); datos.stock = Number(datos.stock);
    if (!datos.nombre || datos.precio <= 0 || !Number.isInteger(datos.stock) || datos.stock < 0) return setMensaje('Revisá nombre, precio y stock.');
    ejecutar(async () => {
      if (id) await updateDoc(doc(db, 'productos', id), datos);
      else await addDoc(collection(db, 'productos'), datos);
      setForm(nuevo);
    });
  }
  return <section className="seccion"><h1>Gestión de productos</h1><form onSubmit={guardar}><h2>{form.id ? 'Editar producto' : 'Nuevo producto'}</h2>
    {Object.entries({ nombre: 'Nombre', precio: 'Precio ($)', stock: 'Stock', categoria: 'Categoría', descripcionCorta: 'Resumen', descripcion: 'Descripción', imagen: 'Ruta de imagen' }).map(([campo, etiqueta]) =>
      <label key={campo}>{etiqueta}<input required={['nombre','precio','stock','categoria','imagen'].includes(campo)} type={['precio','stock'].includes(campo) ? 'number' : 'text'} min={campo === 'precio' ? 0.01 : 0} step={campo === 'precio' ? '0.01' : undefined} value={form[campo]} onChange={e => setForm({ ...form, [campo]: e.target.value })} /></label>)}
    <button className="boton" disabled={ocupado}>Guardar</button>{form.id && <button type="button" onClick={() => setForm(nuevo)}>Cancelar edición</button>}</form>
    <p role="status">{mensaje}</p>{error && <p role="alert">{error}</p>}{cargando && <p>Cargando catálogo…</p>}
    <ul>{productos.map(p => <li key={p.id}>{p.nombre} <button disabled={ocupado} onClick={() => setForm(p)}>Editar</button> <button disabled={ocupado} onClick={() => setBorrar(p)}>Eliminar</button></li>)}</ul>
    <Modal show={Boolean(borrar)} onHide={() => !ocupado && setBorrar(null)} aria-labelledby="confirmacion"><Modal.Header><h2 id="confirmacion">¿Eliminar {borrar?.nombre}?</h2></Modal.Header>
    <Modal.Footer><button disabled={ocupado} onClick={() => setBorrar(null)}>Cancelar</button><button disabled={ocupado} onClick={() => ejecutar(async () => {
      await deleteDoc(doc(db,'productos',borrar.id)); if (form.id === borrar.id) setForm(nuevo); setBorrar(null);
    })}>Confirmar eliminación</button></Modal.Footer></Modal></section>;
}
