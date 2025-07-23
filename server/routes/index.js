const {Router} = require('express');
const usersRouter = require('./usersRouter');
const trainingsRouter = require('./trainingsRouter');

const router = Router();

router.use('/users', usersRouter);
router.use('/trainings', trainingsRouter);

module.exports = router; 