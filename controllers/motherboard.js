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
        console.log(motherboard);
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

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};
