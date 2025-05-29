import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { convertirFecha } from '../functions/genericFunction.js'

export const crearEvento = async (req, res) => {
  const {
    titulo,
    categoria_id,
    mascota_id,
    veterinario_id,
    fecha,
    hora,
    descripcion
  } = req.body;

  try {
    // Validar fecha y hora
    const fechaDate = new Date(fecha);
    const horaDate = new Date(hora);

    if (isNaN(fechaDate.getTime()) || isNaN(horaDate.getTime())) {
      return res.status(400).json({ error: 'Fecha u hora inválida. Se espera formato ISO-8601 válido.' });
    }

    await prisma.eVENTO.create({
      data: {
        titulo,
        categoria_id,
        mascota_id,
        veterinario_id,
        fecha: fechaDate,
        hora: horaDate,
        descripcion
      }
    });

    res.status(200).json({ mensaje: 'Evento creado exitosamente.' });
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el evento.' });
  }
};

export const eliminarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.eVENTO.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ mensaje: 'Evento eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el evento.' });
  }
};

export const actualizarFechaEvento = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora } = req.body;

  try {
    const fechaDate = new Date(fecha);
    const horaDate = new Date(hora);

    if (isNaN(fechaDate.getTime()) || isNaN(horaDate.getTime())) {
      return res.status(400).json({ error: 'Fecha u hora inválida. Se espera formato ISO-8601 válido.' });
    }

    await prisma.eVENTO.update({
      where: { id: parseInt(id) },
      data: {
        fecha: fechaDate,
        hora: horaDate
      }
    });

    res.status(200).json({ mensaje: 'Fecha del evento actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar fecha del evento:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la fecha del evento.' });
  }
};