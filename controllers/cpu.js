const CPU = require('../models/CPU');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const cpu = await CPU.find();
        res.status(200).json(cpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const cpu = await CPU.findById(req.params.id);
        res.status(200).json(cpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const cpu = new CPU({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            frequency: req.body.frequency
        });
        await cpu.save();
        res.status(201).json(cpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const cpu = await CPU.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
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
            res.status(404).json({message: 'CPU not found'})
        } else {
            await CPU.findOneAndDelete({_id: req.params.id});
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
