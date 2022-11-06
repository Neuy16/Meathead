const router = require('express').Router();
const routes = require('./routes');
const userRoutes = require('./userRoutes');
const maxRoutes = require('./maxRoutes');

router.use('/', routes);
router.use('/register', routes);
router.use('/login', routes);
router.use('/user', userRoutes)
router.use('/max', maxRoutes)
module.exports = router;