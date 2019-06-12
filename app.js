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

require('./middleware/passport')(passport);

const guard = passport.authenticate('jwt', { session: false });

app.get('/api/spec', (req, res) => {
    res.sendFile('API Docs.html', {root: __dirname})
});
app.use('/api/auth', authRoutes);
app.use('/api/motherboards', guard, motherboardRoutes);
app.use('/api/cpu', guard, cpuRoutes);
app.use('/api/gpu', guard, gpuRoutes);
app.use('/api/ram', guard, ramRoutes);
app.use('/api/hdd', guard, hddRoutes);
app.use('/api/ssd', guard, ssdRoutes);
app.use('/api/monitor', guard, monitorRoutes);
app.use('/api/mouse', guard, mouseRoutes);

module.exports = app;
