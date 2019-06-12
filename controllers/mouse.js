const Mouse = require('../models/Mouse');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let mouses = await Mouse.find();
        if (req.query.free) {
            mouses = mouses.filter(mouse => !mouse.assignedTo);
        }
        res.status(200).json(mouses);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const mouse = await Mouse.findById(req.params.id);
        res.status(200).json(mouse);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const mouse = new Mouse({
            ...req.body,
            assignedTo: req.body.assignedTo || null
        });
        try {
            await mouse.save();
            res.status(201).json(mouse);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const mouse = await Mouse.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(mouse);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const mouse = await Mouse.findById(req.params.id);
        if (!mouse) {
            res.status(404).json({ message: 'HDD not found' });
        } else {
            await Mouse.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
