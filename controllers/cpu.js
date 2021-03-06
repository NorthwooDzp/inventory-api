const CPU = require('../models/CPU');
const Computer = require('../models/Computer');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let cpu = await CPU.find();
        if (req.query.free) {
            const computers = await Computer.find();
            cpu = cpu.filter(cpu => !computers.find(comp => comp.configuration.cpu === cpu));
        }
        res.status(200).json(cpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const cpu = await CPU.findById(req.params.id);
        if (!cpu) {
            res.status(400).end();
        } else {
            res.status(200).json(cpu);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const cpu = new CPU(req.body);
        try {
            await cpu.save();
            res.status(201).json(cpu);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const cpu = await CPU.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(cpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const cpu = await CPU.findById(req.params.id);
        if (!cpu) {
            res.status(404).json({ message: 'CPU not found' });
        } else {
            await CPU.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
