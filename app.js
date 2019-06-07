const express = require('express');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const motherboardRoutes = require('./routes/motherboard');
const processorRoutes = require('./routes/processor');

const app = express();

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/motherboards', motherboardRoutes);
app.use('/api/processors', processorRoutes);

module.exports = app;

