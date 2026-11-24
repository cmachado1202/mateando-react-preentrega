# Mateando
Tienda de mates y accesorios desarrollada sobre la preentrega de React.

## Ejecutar
Con Node 22.12 o superior, ejecutar `npm ci` y `npm run dev`. Para generar la versión de producción, usar `npm run build`. Para probarla localmente, usar `npm run preview`.

## Catálogo y cuentas
Sin configuración externa se puede recorrer el catálogo original, buscar productos y usar el carrito. El carrito conserva las cantidades durante la navegación y se reinicia al recargar.

Para habilitar cuentas y administración, registrar una aplicación web en Firebase, copiar .env.example a .env.local y completar los cuatro valores de la configuración web. Habilitar Email/Password en Authentication, crear Firestore y publicar las reglas de firestore.rules. Reiniciar Vite después de cambiar las variables. En el alojamiento se deben configurar antes del build.

El catálogo conectado lee la colección productos. Para cargar artículos, registrar una cuenta y crear desde la consola de Firestore un documento en gestores cuyo ID sea el UID de esa cuenta y que contenga, por ejemplo, un campo nombre. Ingresar a Gestión y cargar los productos. Las reglas permiten escribir solo a las cuentas habilitadas. El archivo public/productos.json contiene los datos e imágenes de referencia de la preentrega.

## Recorrido de presentación
Abrir Productos, combinar búsqueda y categoría, entrar al detalle, agregar dos unidades y revisar cantidad y total en Carrito. Quitar un artículo y vaciar el carrito. Con Firebase conectado, registrar una cuenta, probar ingreso y cierre de sesión, y con una cuenta habilitada crear, editar y eliminar un producto. Abrir /gestion sin sesión para comprobar la redirección. En Netlify se incluye la redirección de rutas de la aplicación.
