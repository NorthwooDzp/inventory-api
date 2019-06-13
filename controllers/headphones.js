const Headphones = require('../models/Headphones');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let headphones = await Headphones.find();
        if (req.query.free) {
            headphones = headphones.filter(headphones => !headphones.assignedTo);
        }
        res.status(200).json(headphones);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const headphones = await Headphones.findById(req.params.id);
        if (!headphones) {
            res.status(404).end();
        } else {
            res.status(200).json(headphones);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const headphones = new Headphones({
            ...req.body,
            assignedTo: req.body.assignedTo || null
        });
        try {
            await headphones.save();
            res.status(201).json(headphones);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const headphones = await Headphones.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(headphones);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const headphones = await Headphones.findById(req.params.id);
        if (!headphones) {
            res.status(404).json({ message: 'HDD not found' });
        } else {
            await Headphones.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
