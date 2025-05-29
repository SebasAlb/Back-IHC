import express from 'express';
import { crearCita, actualizarCita, eliminarCita } from '../controllers/AppointmentController.js';

const router = express.Router();

router.post('/create', crearCita);
router.post('/update/:id', actualizarCita);
router.post('/delete/:id', eliminarCita)

export default router;
