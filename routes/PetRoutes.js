import express from 'express';
import { crearMascota, obtenerMascotasPorDuenio, actualizarMascota, obtenerHistorialPorMascotaYDuenio, obtenerDetallesMascota, eliminarMascota } from '../controllers/PetController.js';

const router = express.Router();

router.post('/create', crearMascota);
router.get('/Owner/:duenio_id', obtenerMascotasPorDuenio);
router.post('/update/:id', actualizarMascota);
router.post('/history/Owner', obtenerHistorialPorMascotaYDuenio);
router.get('/schedule/:id', obtenerDetallesMascota);
router.get('/delete/:id', eliminarMascota);

export default router;
