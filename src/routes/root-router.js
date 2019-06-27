const { Router } = require('express');
const path = require('path');
const controller = require('../controllers/root-controller');

module.exports = (app) => {
  const router = Router();

  router.get('/online', (req, res) => {
    res.json(controller.get());
  });

  app.use('/', router);

}
