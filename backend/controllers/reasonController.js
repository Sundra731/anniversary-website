import Reason from '../models/Reason.js';

// Get all reasons
export const getAllReasons = async (req, res) => {
    try {
        const reasons = await Reason.find().sort({ number: 1 });
        res.status(200).json(reasons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single reason
export const getReason = async (req, res) => {
    try {
        const reason = await Reason.findById(req.params.id);
        if (!reason) {
        return res.status(404).json({ message: 'Reason not found' });
        }
        res.status(200).json(reason);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create reason
export const createReason = async (req, res) => {
    try {
        const reason = await Reason.create(req.body);
        res.status(201).json(reason);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update reason
export const updateReason = async (req, res) => {
    try {
        const reason = await Reason.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!reason) {
        return res.status(404).json({ message: 'Reason not found' });
        }
        res.status(200).json(reason);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete reason
export const deleteReason = async (req, res) => {
    try {
        const reason = await Reason.findByIdAndDelete(req.params.id);
        if (!reason) {
        return res.status(404).json({ message: 'Reason not found' });
        }
        res.status(200).json({ message: 'Reason deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};