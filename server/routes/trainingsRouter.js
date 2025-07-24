const {Router} = require('express');
const {trainingsControllers} = require('./../controllers');

const trainingsRouter = Router();

trainingsRouter.route('/')
.post(trainingsControllers.createTraining)
.get(trainingsControllers.getTrainings);

trainingsRouter.route('/:id')
.get(trainingsControllers.getTrainingById)
.patch(trainingsControllers.updateTrainingById)
.delete(trainingsControllers.deleteTrainingById);

module.exports = trainingsRouter;