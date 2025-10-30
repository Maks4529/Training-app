const path = require('path');

const CONSTANTS = {
    STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
};

module.exports = CONSTANTS;