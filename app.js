const express = require('express');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const motherboardRoutes = require('./routes/motherboard');
const cpuRoutes = require('./routes/cpu');
const gpuRoutes = require('./routes/gpu');
const ramRoutes = require('./routes/ram');
const hddRoutes = require('./routes/hdd');
const ssdRoutes = require('./routes/ssd');
const monitorRoutes = require('./routes/monitor');
const mouseRoutes = require('./routes/mouse');

const app = express();

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());
app.use(passport.initialize());

app.use('/api/spec', express.static('./API Docs.html'));
app.use('/api/auth', authRoutes);
app.use('/api/motherboards', motherboardRoutes);
app.use('/api/cpu', cpuRoutes);
app.use('/api/gpu', gpuRoutes);
app.use('/api/ram', ramRoutes);
app.use('/api/hdd', hddRoutes);
app.use('/api/ssd', ssdRoutes);
app.use('/api/monitor', monitorRoutes);
app.use('/api/mouse', mouseRoutes);

module.exports = app;
