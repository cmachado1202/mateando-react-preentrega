# Mateando

Pre-entrega de React JS, Talento Tech, segundo cuatrimestre de 2026.

Tienda ficticia de mates y accesorios. El proyecto está hecho con JavaScript, React, React Router y CSS nativo.

## Ejecutar

Se necesita Node.js 20.19 o superior (o 22.12 o superior).

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Páginas

- `/`: presentación de la tienda.
- `/productos`: catálogo y filtros por categoría.
- `/producto/:id`: detalle de un producto.
- `/carrito`: pantalla preparada para la siguiente entrega.
- Cualquier dirección inexistente muestra una página de error.

## Organización

`src/components` contiene Layout, Header, NavBar, Footer, Item e ItemListContainer.
`src/pages` contiene las vistas. `public/productos.json` contiene los datos y `public/images` las ilustraciones locales.

El catálogo y el detalle cargan el JSON mediante fetch dentro de useEffect. Item recibe un producto por props. El Layout usa Outlet para compartir el encabezado y el pie entre las páginas. Los enlaces de navegación usan Link.

El carrito con Context API queda pendiente para la entrega final, según las consignas. Los precios, el equipo y el contacto son datos de ejemplo. Las ilustraciones SVG son locales y no dependen de servicios externos.

Referencia de clase: https://github.com/thiskodev/react-clases-2c26
