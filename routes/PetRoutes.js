import express from 'express';
import { crearMascota, obtenerMascotasPorDuenio, actualizarMascota, obtenerHistorialPorMascotaYDuenio } from '../controllers/PetController.js';

const router = express.Router();

router.post('/create', crearMascota);
router.get('/Owner/:duenio_id', obtenerMascotasPorDuenio);
router.post('/update/:id', actualizarMascota);
router.post('/history/Owner', obtenerHistorialPorMascotaYDuenio);

export default router;
