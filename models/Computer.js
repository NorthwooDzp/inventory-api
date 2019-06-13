const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const computerSchema = new Schema({
    inventoryNumber: {
        type: String,
        required: true,
        unique: true
    },
    assignedTo: {
        ref: 'employees',
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
        hdd: {
            ref: 'hdd',
            type: Schema.Types.ObjectId
        },
        ssd: {
            ref: 'ssd',
            type: Schema.Types.ObjectId
        },
    }
});

module.exports = mongoose.model('computers', computerSchema);
