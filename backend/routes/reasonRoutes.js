import express from 'express';
import {
    getAllReasons,
    getReason,
    createReason,
    updateReason,
    deleteReason,
} from '../controllers/reasonController.js';

const router = express.Router();

// GET /api/reasons - Get all reasons
router.get('/', getAllReasons);

// GET /api/reasons/:id - Get single reason
router.get('/:id', getReason);

// POST /api/reasons - Create reason
router.post('/', createReason);

// PUT /api/reasons/:id - Update reason
router.put('/:id', updateReason);

// DELETE /api/reasons/:id - Delete reason
router.delete('/:id', deleteReason);

export default router;