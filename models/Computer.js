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
                ref: 'RAM',
                type: Schema.Types.ObjectId
            }
        ],
        processor: {
            ref: 'processors',
            type: Schema.Types.ObjectId
        },
        graphicsCard: {
            ref: 'graphicsCards',
            type: Schema.Types.ObjectId
        },
        HDD: {
            ref: 'HDD',
            type: Schema.Types.ObjectId
        },
        SSD: {
            ref: 'SSD',
            type: Schema.Types.ObjectId
        },
    }
});

module.exports = mongoose.model('computers', computerSchema);
