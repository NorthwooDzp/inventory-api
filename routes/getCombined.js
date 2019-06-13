const router = require('express').Router();
const controller = require('../controllers/getCombined');

router.get('/', controller.getAll);
router.get('/:id', controller.getByEmployee);

module.exports = router;
