import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    }, {
    timestamps: true,
});

const Story = mongoose.model('Story', storySchema);

export default Story;