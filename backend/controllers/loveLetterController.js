import LoveLetter from '../models/loveLetter.js';

// Get all love letters
export const getAllLoveLetters = async (req, res) => {
    try {
        const letters = await LoveLetter.find().sort({ order: 1 });
        res.status(200).json(letters);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single love letter
export const getLoveLetter = async (req, res) => {
    try {
        const letter = await LoveLetter.findById(req.params.id);
        if (!letter) {
        return res.status(404).json({ message: 'Love letter not found' });
        }
        res.status(200).json(letter);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create love letter
export const createLoveLetter = async (req, res) => {
    try {
        const letter = await LoveLetter.create(req.body);
        res.status(201).json(letter);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update love letter
export const updateLoveLetter = async (req, res) => {
    try {
        const letter = await LoveLetter.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!letter) {
        return res.status(404).json({ message: 'Love letter not found' });
        }
        res.status(200).json(letter);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete love letter
export const deleteLoveLetter = async (req, res) => {
    try {
        const letter = await LoveLetter.findByIdAndDelete(req.params.id);
        if (!letter) {
        return res.status(404).json({ message: 'Love letter not found' });
        }
        res.status(200).json({ message: 'Love letter deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};