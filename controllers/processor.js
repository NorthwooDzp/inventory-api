const Processor = require('../models/Processor');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const processor = await Processor.find();
        res.status(200).json(processor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const processor = await Processor.findById(req.params.id);
        res.status(200).json(processor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const processor = new Processor({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            frequency: req.body.frequency
        });
        await processor.save();
        res.status(201).json(processor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const processor = await Processor.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(processor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const processor = await Processor.findById(req.params.id);
        if (!processor) {
            res.status(404).json({message: 'Processor not found'})
        } else {
            await Processor.findOneAndDelete({_id: req.params.id});
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
