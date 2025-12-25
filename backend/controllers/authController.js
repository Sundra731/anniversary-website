import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Verify secret code and login
export const verifySecretCode = async (req, res) => {
    try {
        const { secretCode } = req.body;

        // Check if the secret code matches
        if (secretCode !== process.env.SECRET_CODE) {
        return res.status(401).json({ message: 'Invalid secret code' });
        }

        // Find or create user
        let user = await User.findOne({ secretCode });
        
        if (!user) {
        user = await User.create({
            name: 'Baby Doll',
            secretCode,
            hasVisited: true,
            lastVisit: new Date(),
        });
        } else {
        user.hasVisited = true;
        user.lastVisit = new Date();
        await user.save();
        }

        // Create JWT token
        const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
        );

        res.status(200).json({
        message: 'Welcome, baby doll! 💚',
        token,
        user: {
            id: user._id,
            name: user.name,
            hasVisited: user.hasVisited,
        },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};