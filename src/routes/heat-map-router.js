const { Router } = require('express');
const controller = require('../controllers/heat-map-controller');

const router = Router();

router.get('/', async (req, res) => {
  const data = await controller.get();
  res.json({
    definition: 'Bairros com menos atuação da emlurb; Chamados com situação pendente',
    data,
  });
});

module.exports = router;
