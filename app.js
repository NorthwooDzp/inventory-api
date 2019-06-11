const express = require('express');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const motherboardRoutes = require('./routes/motherboard');
const processorRoutes = require('./routes/processor');
const ramRoutes = require('./routes/ram');
const hddRoutes = require('./routes/hdd');
const ssdRoutes = require('./routes/ssd');

const app = express();

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());
app.use(passport.initialize());

app.use('/api/spec', express.static('./API Docs.html'));
app.use('/api/auth', authRoutes);
app.use('/api/motherboards', motherboardRoutes);
app.use('/api/processors', processorRoutes);
app.use('/api/ram', ramRoutes);
app.use('/api/hdd', hddRoutes);
app.use('/api/ssd', ssdRoutes);

module.exports = app;

