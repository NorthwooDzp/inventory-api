const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hddSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('hdd', hddSchema);
