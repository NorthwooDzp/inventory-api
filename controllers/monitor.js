const Monitor = require('../models/Monitor');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let monitors = await Monitor.find();
        if (req.query.free) {
            monitors = monitors.filter(monitor => !monitor.assignedTo);
        }
        res.status(200).json(monitors);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const monitor = await Monitor.findById(req.params.id);
        if (!monitor) {
            res.status(404).end();
        } else {
            res.status(200).json(monitor);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const monitor = new Monitor({
            ...req.body,
            assignedTo: req.body.assignedTo || null
        });
        try {
            await monitor.save();
            res.status(201).json(monitor);
        } catch (e) {
            res.status(400).json(e);
        }

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const monitor = await Monitor.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(monitor);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const monitor = await Monitor.findById(req.params.id);
        if (!monitor) {
            res.status(404).json({ message: 'HDD not found' });
        } else {
            await Monitor.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
