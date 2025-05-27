import express from 'express';
import { actualizarDuenio } from '../controllers/OwnerController.js';

const router = express.Router();

router.put('/update/:id', actualizarDuenio);

export default router;
