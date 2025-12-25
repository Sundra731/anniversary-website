import mongoose from 'mongoose';

const quizAnswerSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ['text', 'choice'],
        required: true
    },
    answeredAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('QuizAnswer', quizAnswerSchema);