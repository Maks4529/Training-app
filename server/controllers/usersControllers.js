const _ = require('lodash');
const {User} = require('./../db/models');
const createHttpError = require('http-errors');

module.exports.createUser = async (req, res, next) => {
    const {body} = req;

    try {
        const createdUser = await User.create(body);

        if (!createdUser){
            return next(createHttpError(400, 'Something went wrong ¯\_(ツ)_/¯'));
        }

        const preparedUser = _.omit(createdUser.get(), [
            'passwordHash',
            'createdAt',
            'updatedAt',
        ]);

        res.status(201).send({data: preparedUser});
    } catch (err) {
        next(err);
    }
};

module.exports.getUsers = async (req, res, next) => {
    const {limit, offset} = req.pagination;

    try {
        const foundUsers = await User.findAll({
            raw: true,
            attributes: {exclude: ['passwordHash', 'createdAt', 'updatedAt']},
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