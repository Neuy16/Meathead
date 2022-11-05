const router = require('express').Router();
const routes = require('./routes');

router.use('/', routes);
router.use('/register', routes);
router.use('/login', routes);

module.exports = router;