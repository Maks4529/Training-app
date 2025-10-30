const _ = require('lodash');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('./../constants');
const {User, Training, UserTraining} = require('./../db/models');

module.exports.createUser = async (req, res, next) => {
    const {body, file} = req;

    try {
        if (file){
            body.image = `/static/images/${file.filename}`;
        }

        const createdUser = await User.create(body);

        if (!createdUser){
            return next(createHttpError(400, 'Something went wrong ¯\_(ツ)_/¯'));
        }

        const preparedUser = _.omit(createdUser.get(), [
            'passwordHash',
            'createdAt',
            'updatedAt',
        ]);

        const payload = {id: preparedUser.id, email: preparedUser.email};
        const token = jwt.sign(payload, CONSTANTS.JWT_SECRET, {expiresIn: CONSTANTS.ACCESS_TOKEN_TIME});

        res.status(201).send({data: {user: preparedUser, token}});
    } catch (err) {
        next(err);
    }
};

module.exports.getUsers = async (req, res, next) => {
    const {limit, offset} = req.pagination;

    try {
        const foundUsers = await User.findAll({
            attributes: {exclude: ['passwordHash', 'createdAt', 'updatedAt']},
            include: {
                model: Training,
                attributes: ['title'],
                through: {attributes: []},
            }, 
            limit,
            offset,
            order: [['id', 'ASC']],
        });

        res.status(200).send({data: foundUsers});
    } catch (err) {
        next(err);
    }
};

module.exports.getUserById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const foundUser = await User.findByPk(id, {
            raw: true,
            attributes: {exclude: ['passwordHash', 'createdAt', 'updatedAt']},
        });

        if (!foundUser){
            return (createHttpError(404, 'User not found.'))
        }

        res.status(200).send({data: foundUser});
    } catch (err) {
        next(err);
    }
};

module.exports.userLogin = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const foundUser = await User.findOne({
            where: {email},
            include: {
                model: Training,
                through: {attributes: []},
            },
        });

        if (!foundUser){
            return (createHttpError(404, 'User not found.'))
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.passwordHash);

        if (!isPasswordValid){
            return next(createHttpError(401, 'Invalid password.'))
        }

        const preparedUser = _.omit(foundUser.get(), [
            'createdAt',
            'updatedAt',
            'passwordHash',
        ]);

        const payload = {id: preparedUser.id, email: preparedUser.email};

        const token = jwt.sign(payload, CONSTANTS.JWT_SECRET, {expiresIn: CONSTANTS.ACCESS_TOKEN_TIME});

        res.status(200).send({data: {user: preparedUser, token}});
    } catch (err) {
        next(err);
    }
};

module.exports.updateUserById = async (req, res, next) => {
    const {body, params: {id}} = req;

    try {
       const [updatedUserCount, [updatedUser]] = await User.update(body, {
        where: {id},
        raw: true,
        returning: true,
       });

       if (!updatedUserCount){
        return next(createHttpError(404, 'User not found'));
       }

       const preparedUser = _.omit(updatedUser, [
        'passwordHash',
        'createdAt',
        'updatedAt',
       ]);

       res.status(200).send({data: preparedUser});
    } catch (err) {
        next(err);
    }
};

module.exports.deleteUserById = async (req, res, next) => {
    const {id} = req.params;

    try {
       const deletedUserCount = await User.destroy({where: {id}});
       
       if (!deletedUserCount){
        return next(createHttpError(404, 'User not found'));
       }

       res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports.addTrainingToUser = async (req, res, next) => {
    const {userId, trainingId} = req.body;

    try {

        const foundUser = await User.findByPk(userId, {
            include: {
                model: Training,
            },
        });
        const foundTraining = await Training.findByPk(trainingId);

        if (!foundUser || !foundTraining){
            return next(createHttpError(404, 'User or training not found'));
        }

        const alreadyExist = foundUser.Trainings?.some(training => trainingId === training.id);

        if (alreadyExist){
            return next(createHttpError(409, 'Training already added to user'));
        }

        await UserTraining.create({
            userId: foundUser.id,
            trainingId: foundTraining.id,
        });

        const updatedUser = await User.findByPk(userId, {
            include: Training,
        });

    res.status(201).send({data: updatedUser});

    } catch (err) {
        next(err);
    }
};

module.exports.getProfile = async(req, res, next) => {
    try {
        if(!req.user || !req.user.userId) {
            return next(createHttpError(401, 'User not authenticated!'))
        }

        const userId = req.user.userId;

        const foundUser = await User.findByPk(userId, {
            include: {
                model: Training,
                through: {attributes: []},
            }
        });

        if(!foundUser) {
            return next(createHttpError(404, 'User not found!'));
        }

        const preparedUser = _.omit(foundUser.get(), [
            'passwordHash',
            'createdAt',
            'updatedAt',
        ]);

        res.status(200).send({data: preparedUser});
    } catch (err) {
        next(err);
    }
}