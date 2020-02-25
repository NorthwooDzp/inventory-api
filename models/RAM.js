const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ramSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ram', ramSchema);
