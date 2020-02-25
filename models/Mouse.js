const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ssdSchema = new Schema({
    inventoryNumber: {
        type: String,
        required: true,
        unique: true
    },
    assignedTo: {
        ref: 'associate',
        type: Schema.Types.ObjectId
    },
    vendor: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('mouses', ssdSchema);
