import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ItemListContainer from './components/ItemListContainer';
import Inicio from './pages/Inicio';
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import NoEncontrado from './pages/NoEncontrado';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
