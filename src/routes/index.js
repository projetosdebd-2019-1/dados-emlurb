const { static } = require('express');
const rootRouter = require('./root-router');
const heatMapRouter = require('./heat-map-router');

module.exports = (app) => {
  rootRouter(app);
  app.use('/', static(`${__dirname}/../app`));
  app.use('/api/heat-map', heatMapRouter);
};
