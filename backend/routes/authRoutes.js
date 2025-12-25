import express from 'express';
import { verifySecretCode } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/verify - Verify secret code
router.post('/verify', verifySecretCode);

export default router;