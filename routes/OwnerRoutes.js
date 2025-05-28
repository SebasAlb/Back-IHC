import express from 'express';
import { actualizarDuenio } from '../controllers/OwnerController.js';

const router = express.Router();

router.post('/update/:id', actualizarDuenio);

export default router;
