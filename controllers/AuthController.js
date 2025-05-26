import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; 
const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, cedula, telefono, correo, ciudad, direccion, contrasena, foto_url } = req.body;

    // Verificar si ya existe un dueño con esa cédula o correo
    const existingUser = await prisma.dUENIO.findFirst({
      where: {
        OR: [
          { cedula: cedula },
          { correo: correo }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Ya existe un dueño con esa cédula o correo' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear nuevo dueño
    const newOwner = await prisma.dUENIO.create({
      data: {
        nombre,
        apellido,
        cedula,
        telefono,
        correo,
        ciudad,
        direccion,
        contrasena: hashedPassword,
        foto_url,
      }
    });

    res.status(201).json({ message: 'Dueño registrado exitosamente', user: newOwner });
  } catch (error) {
    console.error('Error al registrar dueño:', error);
    res.status(500).json({ error: error.message });
  }
};

// LOGIN DE USUARIO
export const loginUser = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Buscar el dueño por cédula
    const user = await prisma.dUENIO.findUnique({
      where: { correo },
    });

    if (!user) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Aquí podrías generar un token con JWT si lo deseas

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: error.message });
  }
};