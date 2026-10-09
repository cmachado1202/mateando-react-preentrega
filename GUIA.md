# Guía para entender el proyecto

1. main.jsx monta App dentro de BrowserRouter. Así los componentes pueden usar Link y las rutas.
2. App.jsx relaciona cada URL con una vista. Layout se mantiene en todas las páginas y Outlet muestra la vista elegida.
3. ItemListContainer usa useState para guardar los productos, la categoría, el estado de carga y un posible error.
4. useEffect hace fetch de productos.json al montar el catálogo. Después de recibir el JSON, actualiza el estado y React vuelve a renderizar.
5. map crea una tarjeta Item por producto. key usa el id para identificar cada tarjeta. props permite pasar el producto a Item.
6. El filtro utiliza filter para mostrar solo la categoría elegida. No modifica el JSON original.
7. Producto usa useParams para obtener el id de la URL y find para buscar el producto. Si no existe muestra un mensaje.
8. AbortController cancela una petición cuando se desmonta la vista para evitar actualizaciones de una carga vieja.
9. El carrito es una pantalla inicial. En la entrega final se podrá compartir su estado entre páginas usando Context API.

## Práctica

- Cambiar el título y los colores de la tienda.
- Añadir un producto en public/productos.json con un id único.
- Crear una categoría nueva y comprobar que aparece el filtro.
- Abrir /producto/999 para comprobar el mensaje de producto inexistente.
- Explicar qué diferencia hay entre un Link y una etiqueta a.
