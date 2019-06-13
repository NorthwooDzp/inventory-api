const Employee = require('../models/Employee');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        let employee = await Employee.find();
        res.status(200).json(employee);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            res.status(404).end();
        } else {
            res.status(200).json(employee);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        try {
            await employee.save();
            res.status(201).json(employee);
        } catch (e) {
            res.status(400).json(e);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(employee);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!ssd) {
            res.status(404).json({ message: 'HDD not found' });
        } else {
            await employee.findOneAndDelete({ _id: req.params.id });
            res.status(204).end();
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
