const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { errorHandlers } = require('./middleware');

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/api', router);
app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;