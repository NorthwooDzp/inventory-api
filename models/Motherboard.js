const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const motherboardSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    chipset: {
        type: String,
        required: true
    },
    slotsForRam: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('motherboards', motherboardSchema);
