import Story from '../models/Story.js';

// Get all stories
export const getAllStories = async (req, res) => {
    try {
        const stories = await Story.find().sort({ order: 1 });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single story
export const getStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
        return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create story
export const createStory = async (req, res) => {
    try {
        const story = await Story.create(req.body);
        res.status(201).json(story);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update story
export const updateStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!story) {
        return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete story
export const deleteStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndDelete(req.params.id);
        if (!story) {
        return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json({ message: 'Story deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};