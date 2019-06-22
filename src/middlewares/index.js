const { json, static } = require('express');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  app.use(json());
  app.use('/assets', static(`${__dirname}/../app/assets`));
};
