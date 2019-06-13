const Motherboard = require('../models/Motherboard');
const Computer = require('../models/Computer');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let motherboards = await Motherboard.find();
        if (req.query.free) {
            const computers = Computer.find();
            motherboards = motherboards.filter(item => !computers.find(el => el.configuration.motherboard === item));
        }
        res.status(200).json(motherboards);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const motherboard = await Motherboard.findById(req.params.id);
        if (!motherboard) {
            res.status(404).end();
        } else {
            res.status(200).json(motherboard);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const motherboard = new Motherboard(req.body);
        try {
            await motherboard.save();
            res.status(201).json(motherboard);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const motherboard = await Motherboard.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(motherboard);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const motherboard = await Motherboard.findById(req.params.id);
        if (!motherboard) {
            res.status(404).json({ message: 'Motherboard not found' });
        } else {
            await Motherboard.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
