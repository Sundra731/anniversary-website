import Music from '../models/Music.js';

// Get all music
export const getAllMusic = async (req, res) => {
    try {
        const music = await Music.find().sort({ order: 1 });
        res.status(200).json(music);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single music
export const getMusic = async (req, res) => {
    try {
        const music = await Music.findById(req.params.id);
        if (!music) {
        return res.status(404).json({ message: 'Music not found' });
        }
        res.status(200).json(music);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create music
export const createMusic = async (req, res) => {
    try {
        const music = await Music.create(req.body);
        res.status(201).json(music);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update music
export const updateMusic = async (req, res) => {
    try {
        const music = await Music.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!music) {
        return res.status(404).json({ message: 'Music not found' });
        }
        res.status(200).json(music);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete music
export const deleteMusic = async (req, res) => {
    try {
        const music = await Music.findByIdAndDelete(req.params.id);
        if (!music) {
        return res.status(404).json({ message: 'Music not found' });
        }
        res.status(200).json({ message: 'Music deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};