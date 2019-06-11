const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const computerSchema = new Schema({
    inventoryNumber: {
        type: Number,
        required: true,
        unique: true
    },
    assignedTo: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    configuration: {
        motherboard: {
            ref: 'motherboards',
            type: Schema.Types.ObjectId
        },
        ram: [
            {
                ref: 'ram',
                type: Schema.Types.ObjectId
            }
        ],
        cpu: {
            ref: 'cpu',
            type: Schema.Types.ObjectId
        },
        gpu: {
            ref: 'gpu',
            type: Schema.Types.ObjectId
        },
        HDD: {
            ref: 'hdd',
            type: Schema.Types.ObjectId
        },
        SSD: {
            ref: 'ssd',
            type: Schema.Types.ObjectId
        },
    }
});

module.exports = mongoose.model('computers', computerSchema);
