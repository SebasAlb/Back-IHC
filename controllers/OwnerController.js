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