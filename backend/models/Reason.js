import mongoose from 'mongoose';

const reasonSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    text: {
        type: String,
        required: true,
    },
    }, {
    timestamps: true,
});

const Reason = mongoose.model('Reason', reasonSchema);

export default Reason;