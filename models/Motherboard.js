const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const motherboardSchema = new Schema({
    manufacturer: {
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
    }
});

module.exports = mongoose.model('motherboards', motherboardSchema);
