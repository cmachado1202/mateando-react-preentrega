import { createContext, useContext, useState } from 'react';

import { toast } from 'react-toastify';

const CarritoContext = createContext(null);
export const useCarrito = () => useContext(CarritoContext);

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);
  function agregar(producto) {
    setItems(actuales => {
      const linea = actuales.find(item => item.id === producto.id);
      if (!linea) return producto.stock > 0 ? [...actuales, { ...producto, cantidad: 1 }] : actuales;
      return actuales.map(item => item === linea ? { ...producto, cantidad: Math.min(item.cantidad + 1, producto.stock) } : item);
    });
  }
  const eliminar = id => setItems(actuales => actuales.filter(item => item.id !== id));
  const cantidad = items.reduce((suma, item) => suma + item.cantidad, 0);
  return <CarritoContext.Provider value={{ items, cantidad, agregar, eliminar, vaciar: () => setItems([]) }}>{children}</CarritoContext.Provider>;
}

export function Agregar({ producto }) {
  const { items, agregar } = useCarrito();
  const cantidad = items.find(item => item.id === producto.id)?.cantidad || 0;
  return <button className="boton" disabled={cantidad >= producto.stock} onClick={() => { agregar(producto); toast.success(producto.nombre + ' agregado al carrito'); }}>
    {producto.stock === 0 ? 'Sin stock' : cantidad >= producto.stock ? 'Stock máximo en el carrito' : 'Agregar al carrito'}
  </button>;
}
