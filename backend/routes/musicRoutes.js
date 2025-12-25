import express from 'express';
import {
    getAllMusic,
    getMusic,
    createMusic,
    updateMusic,
    deleteMusic,
} from '../controllers/musicController.js';

const router = express.Router();

// GET /api/music - Get all music
router.get('/', getAllMusic);

// GET /api/music/:id - Get single music
router.get('/:id', getMusic);

// POST /api/music - Create music
router.post('/', createMusic);

// PUT /api/music/:id - Update music
router.put('/:id', updateMusic);

// DELETE /api/music/:id - Delete music
router.delete('/:id', deleteMusic);

export default router;