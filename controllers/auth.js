const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../util/errorHandler');


module.exports.login = async (req, res) => {
    try {
        const err = new User(req.body).validateSync();
        if (err) {
            res.status(400).json(err);
            console.log(err);
        } else {
            const candidate = await User.findOne({ email: req.body.email });
            if (!candidate) {
                res.status(404).json({
                    message: 'User with this email does not exist'
                });
            } else {
                const comparePassResult = bcrypt.compareSync(req.body.password, candidate.password);
                if (comparePassResult) {
                    const token = jwt.sign(
                        {
                            email: candidate.email,
                            id: candidate._id
                        },
                        keys.jwtStr,
                        {
                            expiresIn: 60 * 60 * 2
                        }
                    );
                    res.status(200).json({
                        token: `Bearer ${token}`
                    });
                } else {
                    res.status(401).json({
                        message: 'Incorrect Password. Try again'
                    });
                }
            }
        }
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.register = async (req, res) => {
    try {
        const err = new User(req.body).validateSync();
        if (err) {
            res.status(400).json(err);
            console.log(err);
        } else {
            const candidate = await User.findOne({ email: req.body.email });
            if (candidate) {
                res.status(409).json({ message: 'User with this email already exist' });
            } else {
                const salt = bcrypt.genSaltSync(16);
                const user = new User({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, salt)
                });
                try {
                    await user.save();
                    res.status(201).json(user);
                } catch (e) {
                    res.status(400).json(e);
                }
            }
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
