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

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { contrasenaActual, nuevaContrasena } = req.body;

    // Validación básica
    if (!contrasenaActual || !nuevaContrasena) {
      return res.status(400).json({ error: 'Debe ingresar la contraseña actual y la nueva contraseña' });
    }

    if (nuevaContrasena.length < 6) {
      return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    // Buscar dueño por ID
    const existingUser = await prisma.dUENIO.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }

    // Verificar que la contraseña actual coincida
    const isMatch = await bcrypt.compare(contrasenaActual, existingUser.contrasena);

    if (!isMatch) {
      return res.status(401).json({ error: 'La contraseña actual no es correcta' });
    }

    // Hashear la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizar contraseña
    await prisma.dUENIO.update({
      where: {
        id: parseInt(id)
      },
      data: {
        contrasena: hashedNewPassword
      }
    });

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });

  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// LOGIN DE USUARIO
export const loginUser = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

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