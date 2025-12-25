import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
    },
    youtubeUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    order: {
        type: Number,
        required: true,
    },
    }, {
    timestamps: true,
});

const Music = mongoose.model('Music', musicSchema);

export default Music;