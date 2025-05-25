import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; 
const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica si ya existe el usuario
    const existingUser = await prisma.uSUARIOS.findUnique({
      where: { USU_USERNAME: username },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await prisma.uSUARIOS.create({
      data: {
        USU_USERNAME: username,
        USU_PASSWORD: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error); // Added console.error for better debugging
    res.status(500).json({ error: error.message });
  }
};

// LOGIN DE USUARIO
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario por nombre de usuario
    const user = await prisma.uSUARIOS.findUnique({
      where: { USU_USERNAME: username },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.USU_PASSWORD);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si deseas generar un token (opcional, como con JWT), lo puedes hacer aquí

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Added console.error for better debugging
    res.status(500).json({ error: error.message });
  }
};