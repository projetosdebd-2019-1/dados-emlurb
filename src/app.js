const express = require('express');

const app = express();

const middlewares = require('./middlewares');
const routes = require('./routes');

require('./config/database');

middlewares(app);
routes(app);

module.exports = app;
