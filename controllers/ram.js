const RAM = require('../models/RAM');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const ram = await RAM.find();
        res.status(200).json(ram);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const ram = await RAM.findById(req.params.id);
        res.status(200).json(ram);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const ram = new RAM({
            manufacturer: req.body.manufacturer,
            type: req.body.type,
            frequency: req.body.frequency,
            volume: req.body.volume
        });
        await ram.save();
        res.status(201).json(ram);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const ram = await RAM.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
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
            res.status(404).json({message: 'RAM not found'})
        } else {
            await RAM.findOneAndDelete({_id: req.params.id});
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
