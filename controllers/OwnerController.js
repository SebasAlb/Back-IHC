import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ACTUALIZAR DATOS DE DUEÑO
export const actualizarDuenio = async (req, res) => {
  const { id } = req.params;
  try {
    const duenio = await prisma.dUENIO.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.status(200).json(duenio);
  } catch (error) {
    console.error('Error al actualizar dueño:', error);
    res.status(500).json({ error: error.message });
  }
};

// OBTENER CITAS Y EVENTOS DEL DUEÑO
export const obtenerCitasYEventosPorDuenio = async (req, res) => {
  const { id } = req.params;

  try {
    const mascotas = await prisma.mASCOTA.findMany({
      where: {
        duenio_id: parseInt(id),
      },
      include: {
        citas: true,
        eventos: true,
      },
    });

    const resultado = mascotas.map((mascota) => ({
      mascota_id: mascota.id,
      nombre_mascota: mascota.nombre,
      citas: mascota.citas.map((cita) => ({
        tipo: 'Cita',
        id: cita.id,
        razon_cita: cita.razon_cita,
        fecha: cita.fecha,
        hora: cita.hora,
        estado: cita.estado,
        descripcion: cita.descripcion,
      })),
      eventos: mascota.eventos.map((evento) => ({
        tipo: 'Evento',
        id: evento.id,
        titulo: evento.titulo,
        fecha: evento.fecha,
        hora: evento.hora,
        descripcion: evento.descripcion,
      })),
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al obtener citas y eventos:', error);
    res.status(500).json({ error: error.message });
  }
};