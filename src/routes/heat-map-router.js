const { Router } = require('express');
const controller = require('../controllers/heat-map-controller');

const router = Router();
//MENOR ATUAÇÃO STARTA NORMAL, E TEM FILTRO DE ANO
router.get('/MenorAtuacao', async (req, res) => {
  const ano = req.query.ano;
  console.log(ano)
  let data;
  if (ano != undefined){
    data = await controller.getMenorAtuacao1(ano);
  }
  else{
    data = await controller.getMenorAtuacao();
  }
  res.json({
    definition: 'Bairros com menos atuação da emlurb; Chamados com situação pendente em:' + `${ano}`,
    data,
  });
});

//SERVICOS RECORRENTES, OBRIGATÓRIO FILTRO DE BAIRRO e POSSIBILIDADE DE FILTRO DE ANO
router.get('/ServicosRecorrentes', async (req, res) => {
  const bairro = req.query.bairro;
  const ano = req.query.ano;
  let data;
  if(bairro != undefined && ano == undefined ){
    data = await controller.getMaisRecorrentes(bairro);
  }
  else if(bairro != undefined && ano != undefined ){
    data = await controller.getMaisRecorrentes1(bairro, ano);
  }
  res.json({
    definition: `Servicos mais recorrentes em: ${bairro} no ano de : ${ano}`,
    data,
  });
});

router.get('/TodosChamados', async (req, res) => {
  const data = await controller.getTodosChamados();
  res.json({
    definition: "Todos os chamados",
    data,
  })
})

//situacoes para o filtro
router.get('/Situacao', async (req, res) => {
  const data =  await controller.getSitucoes();
  res.json({
    data,
  });
});


module.exports = router;
