const {Router} = require('express');
const usersRouter = require('./usersRouter');
const traningsRouter = require('./trainingsRouter');

const router = Router();

router.use('/users', usersRouter);
router.use('/trainings', traningsRouter);

module.exports = router; 