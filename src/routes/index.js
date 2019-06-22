const rootRouter = require('./root-router');
const heatMapRouter = require('./heat-map-router');

module.exports = (app) => {
  rootRouter(app);
  app.use('/heat-map', heatMapRouter);
};
