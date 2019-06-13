const RAM = require('../models/RAM');
const Computer = require('../models/Computer');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let ram = await RAM.find();
        if (req.query.free) {
            const computers = await Computer.find();
            ram = ram.filter(item => !computers.find(el => el.configuration.ram.find(ram === item)));
        }
        res.status(200).json(ram);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const ram = await RAM.findById(req.params.id);
        if (!ram) {
            res.status(404).end();
        } else {
            res.status(200).json(ram);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const ram = new RAM(req.body);
        try {
            await ram.save();
            res.status(201).json(ram);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const ram = await RAM.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(ram);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const ram = await RAM.findById(req.params.id);
        if (!ram) {
            res.status(404).json({ message: 'RAM not found' });
        } else {
            await RAM.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
