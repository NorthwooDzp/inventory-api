const HDD = require('../models/HDD');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const hdd = await HDD.find();
        res.status(200).json(hdd);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const hdd = await HDD.findById(req.params.id);
        res.status(200).json(hdd);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const hdd = new HDD({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            volume: req.body.volume
        });
        await hdd.save();
        res.status(201).json(hdd);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const hdd = await HDD.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(hdd);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const hdd = await HDD.findById(req.params.id);
        if (!hdd) {
            res.status(404).json({message: 'HDD not found'})
        } else {
            await HDD.findOneAndDelete({_id: req.params.id});
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
