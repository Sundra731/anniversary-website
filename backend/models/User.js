import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    secretCode: {
        type: String,
        required: true,
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    lastVisit: {
        type: Date,
    },
    }, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;