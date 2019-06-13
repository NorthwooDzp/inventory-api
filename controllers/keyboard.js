const Keyboard = require('../models/Keyboard');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let keyboards = await Keyboard.find();
        if (req.query.free) {
            keyboards = keyboards.filter(keyboard => !keyboard.assignedTo);
        }
        res.status(200).json(keyboards);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const keyboard = await Keyboard.findById(req.params.id);
        if (!keyboard) {
            res.status(404).end();
        } else {
            res.status(200).json(keyboard);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const keyboard = new Keyboard({
            ...req.body,
            assignedTo: req.body.assignedTo || null
        });
        try {
            await keyboard.save();
            res.status(201).json(keyboard);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const keyboard = await Keyboard.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(keyboard);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const keyboard = await Keyboard.findById(req.params.id);
        if (!keyboard) {
            res.status(404).json({ message: 'HDD not found' });
        } else {
            await Keyboard.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
