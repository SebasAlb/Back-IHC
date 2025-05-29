export function convertirFecha(fechaString) {
  if (!fechaString) {
    throw new Error('La fecha es requerida.');
  }

  const fecha = new Date(fechaString);
  if (isNaN(fecha.getTime())) {
    throw new Error('Formato de fecha inválido. Se espera una cadena en formato ISO-8601.');
  }

  return fecha;
}
