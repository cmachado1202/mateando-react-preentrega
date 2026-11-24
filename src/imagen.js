export function imagenProducto(ruta) {
  return ruta?.startsWith('/images/') ? import.meta.env.BASE_URL + ruta.slice(1) : ruta;
}
