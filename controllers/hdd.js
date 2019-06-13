const HDD = require('../models/HDD');
const Computer = require('../models/Computer');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let hdd = await HDD.find();
        if (req.query.free) {
            const computers = await Computer.find();
            hdd = hdd.filter(hdd => !computers.find(comp => comp.configuration.HDD === hdd));
        }
        res.status(200).json(hdd);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const hdd = await HDD.findById(req.params.id);
        if (!hdd) {
            res.status(404).end();
        } else {
            res.status(200).json(hdd);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const hdd = new HDD(req.body);
        try {
            await hdd.save();
            res.status(201).json(hdd);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const hdd = await HDD.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
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
            res.status(404).json({ message: 'HDD not found' });
        } else {
            await HDD.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
