const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ssdSchema = new Schema({
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
    },
    interface: {
        type: String,
        enum: ['sata', 'm2']
    }
});

module.exports = mongoose.model('ssd', ssdSchema);
