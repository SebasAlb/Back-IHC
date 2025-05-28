import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREAR MASCOTA
export const crearMascota = async (req, res) => {

  const { nombre, especie, raza, fecha_nacimiento, sexo, peso, altura, foto_url, duenio_id } = req.body;

    // *** Aquí está la clave: convertir la cadena de fecha a un objeto Date ***
    let fechaNacimientoDate = null;
    if (fecha_nacimiento) {
      fechaNacimientoDate = new Date(fecha_nacimiento);
      // Opcional: Puedes añadir una validación extra si la conversión falla
      if (isNaN(fechaNacimientoDate.getTime())) {
        return res.status(400).json({ error: 'Fecha de nacimiento inválida. Se espera un formato ISO-8601 válido.' });
      }
    } else {
        // Manejar el caso donde fecha_nacimiento podría ser opcional o no enviado
        return res.status(400).json({ error: 'La fecha de nacimiento es requerida.' });
    }

  try {
    const mascota = await prisma.mASCOTA.create({
      data: {
        nombre,
        especie,
        raza,
        fecha_nacimiento: fechaNacimientoDate, // ¡Usamos el objeto Date convertido!
        sexo,
        peso,
        altura,
        foto_url,
        duenio_id,
      },
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
  const { duenio_id, mascota_id } = req.body;
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