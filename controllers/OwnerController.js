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
        deleted_at: null,
      },
      include: {
        citas: {
          include: {
            veterinario: true,
          },
        },
        eventos: {
          include: {
            veterinario: true,
            categoria: true,
          },
        },
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
        veterinario: cita.veterinario
          ? {
              id: cita.veterinario.id,
              nombre: cita.veterinario.nombre,
              apellido: cita.veterinario.apellido,
              cedula_profesional: cita.veterinario.cedula_profesional,
              telefono: cita.veterinario.telefono,
              correo: cita.veterinario.correo,
              rol: cita.veterinario.rol,
              fecha_ingreso: cita.veterinario.fecha_ingreso,
              foto_url: cita.veterinario.foto_url,
            }
          : null,
      })),
      eventos: mascota.eventos.map((evento) => ({
        tipo: 'Evento',
        id: evento.id,
        titulo: evento.titulo,
        fecha: evento.fecha,
        hora: evento.hora,
        descripcion: evento.descripcion,
        categoria: evento.categoria
          ? {
              id: evento.categoria.id,
              nombre: evento.categoria.nombre,
            }
          : null,
        veterinario: evento.veterinario
          ? {
              id: evento.veterinario.id,
              nombre: evento.veterinario.nombre,
              apellido: evento.veterinario.apellido,
              cedula_profesional: evento.veterinario.cedula_profesional,
              telefono: evento.veterinario.telefono,
              correo: evento.veterinario.correo,
              rol: evento.veterinario.rol,
              fecha_ingreso: evento.veterinario.fecha_ingreso,
              foto_url: evento.veterinario.foto_url,
            }
          : null,
      })),
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al obtener citas y eventos:', error);
    res.status(500).json({ error: error.message });
  }
};
