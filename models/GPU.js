const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpuSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('gpu', gpuSchema);
