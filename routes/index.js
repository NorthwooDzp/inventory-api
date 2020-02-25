const router = require('express').Router();
const passport = require('passport');

const authRoutes = require('./auth');
const motherboardRoutes = require('./motherboard');
const cpuRoutes = require('./cpu');
const gpuRoutes = require('./gpu');
const ramRoutes = require('./ram');
const hddRoutes = require('./hdd');
const ssdRoutes = require('./ssd');
const monitorRoutes = require('./monitor');
const mouseRoutes = require('./mouse');
const keyboardRoutes = require('./keyboard');
const employeeRoutes = require('./employee');
const compRoutes = require('./computer');
const getInfoRoutes = require('./getCombined');

const guard = passport.authenticate('jwt', { session: false });

router.use('/auth', authRoutes);
router.use('/motherboards', guard, motherboardRoutes);
router.use('/cpu', guard, cpuRoutes);
router.use('/gpu', guard, gpuRoutes);
router.use('/ram', guard, ramRoutes);
router.use('/hdd', guard, hddRoutes);
router.use('/ssd', guard, ssdRoutes);
router.use('/monitor', guard, monitorRoutes);
router.use('/mouse', guard, mouseRoutes);
router.use('/employee', guard, employeeRoutes);
router.use('/computer', guard, compRoutes);
router.use('/keyboard', guard, keyboardRoutes);
router.use('/getInfo', guard, getInfoRoutes);

module.exports = router;
