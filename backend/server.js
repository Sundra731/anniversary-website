import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import loveLetterRoutes from './routes/loveLetterRoutes.js';
import reasonRoutes from './routes/reasonRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import musicRoutes from './routes/musicRoutes.js';
import quizRoutes from './routes/quiz.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Anniversary Website API is running!' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/love-letters', loveLetterRoutes);
app.use('/api/reasons', reasonRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/quiz', quizRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});