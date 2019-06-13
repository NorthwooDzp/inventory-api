const SSD = require("../models/SSD");
const Computer = require("../models/Computer");
const errorHandler = require("../util/errorHandler");

module.exports.getAll = async (req, res) => {
    try {
        let ssd = await SSD.find();
        if (req.query.free) {
            const computers = await Computer.find();
            ssd = ssd.filter(
                item => !computers.find(el => el.configuration.cpu === item)
            );
        }
        res.status(200).json(ssd);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const ssd = await SSD.findById(req.params.id);
        if (!ssd) {
            res.status(404).end();
        } else {
        res.status(200).json(ssd);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const ssd = new SSD(req.body);
        try {
            await ssd.save();
            res.status(201).json(ssd);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const ssd = await SSD.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(ssd);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const ssd = await SSD.findById(req.params.id);
        if (!ssd) {
            res.status(404).json({ message: "HDD not found" });
        } else {
            await SSD.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
