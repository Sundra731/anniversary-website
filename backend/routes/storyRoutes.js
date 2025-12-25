import express from 'express';
import {
    getAllStories,
    getStory,
    createStory,
    updateStory,
    deleteStory,
} from '../controllers/storyController.js';

const router = express.Router();

// GET /api/stories - Get all stories
router.get('/', getAllStories);

// GET /api/stories/:id - Get single story
router.get('/:id', getStory);

// POST /api/stories - Create story
router.post('/', createStory);

// PUT /api/stories/:id - Update story
router.put('/:id', updateStory);

// DELETE /api/stories/:id - Delete story
router.delete('/:id', deleteStory);

export default router;