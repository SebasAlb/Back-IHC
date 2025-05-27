import express from 'express';
import { actualizarDuenio } from '../controllers/OwnerController.js';

const router = express.Router();

router.put('/update', actualizarDuenio);

export default router;
