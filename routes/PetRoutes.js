import express from 'express';
import { crearMascota, obtenerMascotasPorDuenio, actualizarMascota, obtenerHistorialPorMascotaYDuenio } from '../controllers/PetController.js';

const router = express.Router();

router.post('/create', crearMascota);
router.post('/pet/Owner', obtenerMascotasPorDuenio);
router.put('/update', actualizarMascota);
router.post('/history/Owner', obtenerHistorialPorMascotaYDuenio);

export default router;
