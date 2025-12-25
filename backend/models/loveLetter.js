import mongoose from 'mongoose';

const loveLetterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    order: {
        type: Number,
        required: true,
    },
    }, {
    timestamps: true,
});

const LoveLetter = mongoose.model('LoveLetter', loveLetterSchema);

export default LoveLetter;