const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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
    },
    diagonal: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('monitors', ssdSchema);
