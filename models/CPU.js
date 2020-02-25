const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cpuSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('cpu', cpuSchema);
