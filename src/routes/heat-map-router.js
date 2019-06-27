const { Router } = require('express');
const controller = require('../controllers/heat-map-controller');

const router = Router();

router.get('/MenorAtuacao', async (req, res) => {
  const data = await controller.getMenorAtuacao();
  res.json({
    definition: 'Bairros com menos atuação da emlurb; Chamados com situação pendente',
    data,
  });
});

router.get('/ServicosRecorrentes', async (req, res) => {
  const bairro = req.query.bairro;
  const data = await controller.getMaisRecorrentes(bairro);
  res.json({
    definition: 'Servicos mais recorrentes em: ',
    data,
  });
});

module.exports = router;
