const _ = require('lodash');
const {Training} = require('./../models');
const createHttpError = require('http-errors');

module.exports.createTraining = async (req, res, next) => {
    const {body} = req;

    try {
        const createdTraining = await Training.create(body);

        if (!createdTraining){
            return next(createHttpError(400, 'Something went wrong ¯\_(ツ)_/¯'));
        }

        const preparedTraining = _.omit(createdTraining.get(), [
            'createdAt',
            'updatedAt',
        ]);

        res.status(201).send({data: preparedTraining});
    } catch (err) {
        next(err);
    }
};

module.exports.getTrainings = async (req, res, next) => {
    try {
        const foundTrainings = await Training.findAll({
            raw: true,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            order: [['id', 'ASC']],
        });

        res.status(200).send({data: foundTrainings});
    } catch (err) {
        next(err);
    }
};

module.exports.getTrainingById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const foundTraining = await Training.findByPk(id, {
            raw: true,
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });

        if (!foundTraining){
            return (createHttpError(404, 'Training not found.'))
        }

        res.status(200).send({data: foundTraining});
    } catch (err) {
        next(err);
    }
};

module.exports.updateTrainingById = async (req, res, next) => {
    const {body, params: {id}} = req;

    try {
       const [updatedTrainingCount, [updatedTraining]] = await Training.update(body, {
        where: {id},
        raw: true,
        returning: true,
       });

       if (!updatedTrainingCount){
        return next(createHttpError(404, 'Training not found'));
       }

       const preparedTraining = _.omit(updatedTraining, [
        'createdAt',
        'updatedAt',
       ]);

       res.status(200).send({data: preparedTraining});
    } catch (err) {
        next(err);
    }
};

module.exports.deleteTrainingById = async (req, res, next) => {
    const {id} = req.params;

    try {
       const deletedTrainingCount = await Training.destroy({where: {id}});
       
       if (!deletedTrainingCount){
        return next(createHttpError(404, 'Training not found'));
       }

       res.status(204).end();
    } catch (err) {
        next(err);
    }
};