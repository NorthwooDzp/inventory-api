const Motherboard = require('../models/Motherboard');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const motherboards = await Motherboard.find();
        res.status(200).json(motherboards);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const motherboard = await Motherboard.findById(req.params.id);
        res.status(200).json(motherboard);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const motherboard = new Motherboard({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            chipset: req.body.chipset
        });
        await motherboard.save();
        res.status(201).json(motherboard);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const motherboard = await Motherboard.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
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
            res.status(404).json({message: 'Motherboard not found'})
        } else {
            await Motherboard.findOneAndDelete({_id: req.params.id});
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
