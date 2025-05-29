import express from 'express';
import { actualizarDuenio, obtenerCitasYEventosPorDuenio } from '../controllers/OwnerController.js';

const router = express.Router();

router.post('/update/:id', actualizarDuenio);
router.get('/:id/schedule', obtenerCitasYEventosPorDuenio);

export default router;
