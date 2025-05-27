import express from 'express';
import { obtenerVeterinarios } from '../controllers/VetController.js';

const router = express.Router();

router.get('/getAll', obtenerVeterinarios);

export default router;
