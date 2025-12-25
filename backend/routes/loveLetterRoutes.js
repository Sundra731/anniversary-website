import express from 'express';
import {
    getAllLoveLetters,
    getLoveLetter,
    createLoveLetter,
    updateLoveLetter,
    deleteLoveLetter,
} from '../controllers/loveLetterController.js';

const router = express.Router();

// GET /api/love-letters - Get all love letters
router.get('/', getAllLoveLetters);

// GET /api/love-letters/:id - Get single love letter
router.get('/:id', getLoveLetter);

// POST /api/love-letters - Create love letter
router.post('/', createLoveLetter);

// PUT /api/love-letters/:id - Update love letter
router.put('/:id', updateLoveLetter);

// DELETE /api/love-letters/:id - Delete love letter
router.delete('/:id', deleteLoveLetter);

export default router;