import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { convertirFecha } from '../functions/genericFunction.js'

export const crearCita = async (req, res) => {
  try {
    const { mascota_id, veterinario_id, razon_cita, fecha, hora, descripcion } = req.body;

    // Validación y conversión de fechas
    const fechaDate = convertirFecha(fecha);
    const horaDate = convertirFecha(hora); // si estás usando DateTime para la hora también

    await prisma.cITA.create({
      data: {
        mascota_id,
        veterinario_id,
        razon_cita,
        fecha: fechaDate,
        hora: horaDate,
        descripcion,
      },
    });

    res.status(201).json({ mensaje: 'Cita creada exitosamente' });
  } catch (error) {
    console.error('Error al crear cita:', error);
    res.status(500).json({ error: error.message });
  }
};

export const actualizarCita = async (req, res) => {
  const { id } = req.params;

  try {
    const { mascota_id, veterinario_id, razon_cita, fecha, hora, descripcion, estado } = req.body;

    // Convertir fechas si vienen en el body
    let fechaDate = null;
    let horaDate = null;

    if (fecha) {
      fechaDate = convertirFecha(fecha);
    }

    if (hora) {
      horaDate = convertirFecha(hora);
    }

    const citaActualizada = await prisma.cITA.update({
      where: { id: parseInt(id) },
      data: {
        ...(mascota_id && { mascota_id }),
        ...(veterinario_id && { veterinario_id }),
        ...(razon_cita && { razon_cita }),
        ...(estado && { estado }),
        ...(fechaDate && { fecha: fechaDate }),
        ...(horaDate && { hora: horaDate }),
        ...(descripcion && { descripcion }),
      },
    });

    res.status(200).json({ mensaje: 'Cita actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    res.status(500).json({ error: error.message });
  }
};

export const eliminarCita = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cITA.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ mensaje: 'Cita eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la cita' });
  }
};