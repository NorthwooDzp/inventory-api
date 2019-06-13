const Computer = require('../models/Computer');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let computers = await Computer.find()
            .populate('assignedTo')
            .populate('configuration.ram')
            .populate('configuration.gpu')
            .populate('configuration.motherboard')
            .populate('configuration.cpu')
            .populate('configuration.hdd')
            .populate('configuration.ssd');
        if (req.query.free) {
            computers = computers.filter(comp => !comp.assignedTo);
        }
        res.status(200).json(computers);
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.getById = async (req, res) => {
    try {
        const comp = await Computer.findById(req.params.id)
            .populate('assignedTo')
            .populate('configuration.ram')
            .populate('configuration.gpu')
            .populate('configuration.motherboard')
            .populate('configuration.cpu')
            .populate('configuration.hdd')
            .populate('configuration.ssd');
        if (!comp) {
            res.status(404).end();
        } else {
            res.status(200).json(comp);
        }
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.create = async (req, res) => {
    try {
        const computer = new Computer(req.body);
        try {
            await computer.save();
            res.status(201).json(computer);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const computer = await Computer.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(computer);
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.delete = async (req, res) => {
    try {
        const computer = await Computer.findById(req.params.id);
        if (!computer) {
            res.status(404).end();
        } else {
            await Computer.findOneAndDelete({_id: req.params.id});
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
