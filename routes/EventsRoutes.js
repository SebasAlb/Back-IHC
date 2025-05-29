import express from 'express';
import { crearEvento, eliminarEvento, actualizarFechaEvento } from '../controllers/EventController.js';

const router = express.Router();

router.post('/create', crearEvento);
router.post('/updateDate/:id', actualizarFechaEvento);
router.post('/delete/:id', eliminarEvento)

export default router;
