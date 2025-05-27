import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// OBTENER LISTADO DE VETERINARIOS CON HORARIOS Y EXCEPCIONES
export const obtenerVeterinarios = async (req, res) => {
  try {
    const veterinarios = await prisma.vETERINARIO.findMany({
      include: {
        horarios: true,
        excepciones: true
      }
    });
    res.status(200).json(veterinarios);
  } catch (error) {
    console.error('Error al obtener veterinarios:', error);
    res.status(500).json({ error: error.message });
  }
};