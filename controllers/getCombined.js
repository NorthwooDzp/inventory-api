const Employee = require(`../models/Employee`);
const Computer = require('../models/Computer');
const Mouse = require('../models/Mouse');
const Keyboard = require('../models/Keyboard');
const Monitor = require('../models/Monitor');
const Headphones = require('../models/Headphones');

module.exports.getAll = async (req, res) => {
    try {
        const employees = await Employee.find();
        const computers = await Computer.find({ assignedTo: { $ne: null } })
            .populate('configuration.ram')
            .populate('configuration.gpu')
            .populate('configuration.motherboard')
            .populate('configuration.cpu')
            .populate('configuration.hdd')
            .populate('configuration.ssd');
        const mouses = await Mouse.find({ assignedTo: { $ne: null } });
        const monitors = await Monitor.find({ assignedTo: { $ne: null } });
        const keyboards = await Keyboard.find({ assignedTo: { $ne: null } });
        const headphones = await Headphones.find({ assignedTo: { $ne: null } });
        const result = [];
        employees.forEach(employee => {
            result.push({
                employee,
                computer: computers.find(item => item.assignedTo.equals(employee._id)),
                monitor: monitors.filter(item => item.assignedTo.equals(employee._id)),
                keyboard: keyboards.find(item => item.assignedTo.equals(employee._id)),
                mouse: mouses.find(item => item.assignedTo.equals(employee._id)),
                headphones: headphones.find(item => item.assignedTo.equals(employee._id))
            });
        });
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports.getByEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            res.status(404).end();
        } else {
            console.log(employee);
            const computer = await Computer.findOne({ assignedTo: employee._id })
                .populate('configuration.ram')
                .populate('configuration.gpu')
                .populate('configuration.motherboard')
                .populate('configuration.cpu')
                .populate('configuration.hdd')
                .populate('configuration.ssd');
            const mouse = await Mouse.findOne({ assignedTo: employee._id});
            const monitors = await Monitor.find({ assignedTo: employee._id });
            const keyboard = await Keyboard.findOne({ assignedTo: employee._id });
            const headphone = await Headphones.findOne({ assignedTo: employee._id });
            res.status(200).json({ computer, monitors, mouse, employee, keyboard, headphone });
        }
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }

};
