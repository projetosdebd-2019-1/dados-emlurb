const { json } = require('express');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  app.use(json());
};
