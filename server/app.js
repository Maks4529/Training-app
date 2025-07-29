const express = require('express');
const cors = require('cors');
const {STATIC_PATH} = require('./constants');
const router = require('./routes');
const { errorHandlers } = require('./middleware');

const app = express();

app.use(cors({origin: '*'}));
app.use('/static', express.static(STATIC_PATH));
app.use(express.json());
app.use('/api', router);
app.use(errorHandlers.dbErrorHandler, errorHandlers.multerErrorHandler, errorHandlers.errorHandler);

module.exports = app;