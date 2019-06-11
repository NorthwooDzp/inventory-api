const GPU = require('../models/GPU');
const Computer = require('../models/Computer');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let gpu = await GPU.find();
        if (req.query.free) {
            const computers = await Computer.find();
            gpu = gpu.filter(gpu => !computers.find(comp => comp.configuration.cpu === gpu));
        }
        res.status(200).json(gpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const gpu = await GPU.findById(req.params.id);
        res.status(200).json(gpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const gpu = new GPU({
            manufacturer: req.body.manufacturer,
            model: req.body.model
        });
        await gpu.save();
        res.status(201).json(gpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const gpu = await GPU.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(gpu);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const gpu = await GPU.findById(req.params.id);
        if (!gpu) {
            res.status(404).json({message: 'GPU not found'})
        } else {
            await GPU.findOneAndDelete({_id: req.params.id});
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
