const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keyboardSchema = new Schema({
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

module.exports = mongoose.model('keyboards', keyboardSchema);
