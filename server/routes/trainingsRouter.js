const {Router} = require('express');

const trainingsRouter = Router();

trainingsRouter.route('/')
.post(() => {})
.get(() => {});

trainingsRouter.route('/:id')
.patch(() => {})
.delete(() => {});

module.exports = trainingsRouter;