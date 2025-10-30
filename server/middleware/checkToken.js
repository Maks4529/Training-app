const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const CONSTANTS = require('./../constants');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return next(createHttpError(401, 'Authorization header is missing'));
        }

        const token = authHeader.split(' ')[1];
        if(!token) {
            return next(createHttpError(401, 'Token is missing'));
        }

        const decodedToken = jwt.verify(token, CONSTANTS.JWT_SECRET);

        req.user = {
            userId: decodedToken.id,
            email: decodedToken.email,
        }

        next();
    } catch (err) {
        return next(createHttpError(401, 'Invalid or expired token'));
    }
};