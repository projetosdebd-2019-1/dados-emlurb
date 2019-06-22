const { Router } = require('express');
const path = require('path');
const controller = require('../controllers/root-controller');

module.exports = (app) => {
  const router = Router();

  router.get('/', function(req, res){
    res.sendFile(path.join(`${__dirname}/../app/index.html`));
  });

  router.get('/online', (req, res) => {
    res.json(controller.get());
  });

  app.use('/', router);

}
