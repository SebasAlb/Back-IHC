import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREAR MASCOTA
export const crearMascota = async (req, res) => {
  try {
    const mascota = await prisma.mASCOTA.create({
      data: req.body,
      include: {
        duenio: true,
        citas: true,
        historial: true,
        eventos: true
      }
    });
    res.status(201).json(mascota);
  } catch (error) {
    console.error('Error al crear mascota:', error);
    res.status(500).json({ error: error.message });
  }
};

// OBTENER MASCOTAS DE UN DUEÑO
export const obtenerMascotasPorDuenio = async (req, res) => {
  const { duenio_id } = req.params;
  try {
    const mascotas = await prisma.mASCOTA.findMany({
      where: { duenio_id: parseInt(duenio_id) },
      include: {
        duenio: true,
        citas: true,
        historial: true,
        eventos: true
      }
    });
    res.status(200).json(mascotas);
  } catch (error) {
    console.error('Error al obtener mascotas del dueño:', error);
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR DATOS DE MASCOTA
export const actualizarMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await prisma.mASCOTA.update({
      where: { id: parseInt(id) },
      data: req.body,
      include: {
        duenio: true,
        citas: true,
        historial: true,
        eventos: true
      }
    });
    res.status(200).json(mascota);
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    res.status(500).json({ error: error.message });
  }
};

// OBTENER HISTORIAL MÉDICO DE UNA MASCOTA POR DUEÑO
export const obtenerHistorialPorMascotaYDuenio = async (req, res) => {
  const { duenio_id, mascota_id } = req.params;
  try {
    const historial = await prisma.hISTORIAL_MEDICO.findMany({
      where: {
        mascota_id: parseInt(mascota_id),
        mascota: {
          duenio_id: parseInt(duenio_id)
        }
      },
      include: {
        categoria: true,
        mascota: true
      }
    });
    res.status(200).json(historial);
  } catch (error) {
    console.error('Error al obtener historial médico:', error);
    res.status(500).json({ error: error.message });
  }
};