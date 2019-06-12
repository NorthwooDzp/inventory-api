const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const keyboardSchema = new Schema({
    inventoryNumber: {
        type: Number,
        required: true,
        unique: true
    },
    assignedTo: {
        ref: 'associate',
        type: Schema.Types.ObjectId
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('keyboards', keyboardSchema);
