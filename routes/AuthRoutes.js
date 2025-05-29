import express from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePassword/:id', changePassword)

export default router;
