import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
const CatalogoContext = createContext(null);
export const useCatalogo = () => useContext(CatalogoContext);
export function CatalogoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    function listo(datos) { setProductos(datos); setCargando(false); }
    function fallo() { setError('No se pudo cargar el catálogo. Revisá la conexión.'); setCargando(false); }
    if (db) return onSnapshot(collection(db, 'productos'), snap => listo(snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))), fallo);
    const controller = new AbortController();
    fetch('/productos.json', { signal: controller.signal }).then(r => {
      if (!r.ok) throw new Error();
      return r.json();
    }).then(listo).catch(e => { if (e.name !== 'AbortError') fallo(); });
    return () => controller.abort();
  }, []);
  return <CatalogoContext.Provider value={{ productos, cargando, error }}>{children}</CatalogoContext.Provider>;
}
