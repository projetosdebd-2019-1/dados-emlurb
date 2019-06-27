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
    definition: `Bairros com menos atuação da emlurb. Chamados com situação pendente ${ano ? 'em: ' + ano : '' }`,
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
    res.json({
      definition: `Servicos mais recorrentes em: ${bairro}`,
      data,
    });
  }
  else if(bairro != undefined && ano != undefined ){
    data = await controller.getMaisRecorrentes1(bairro, ano);
    res.json({
      definition: `Servicos mais recorrentes em: ${bairro} no ano de : ${ano}`,
      data,
    });
  }

});
//TODOS OS CHAMADOS UTILIZANDO FILTROS
router.get('/TodosChamados', async (req, res) => {
  const ano = req.query.ano;
  const bairro = req.query.bairro;
  const situacao = req.query.situacao;
  let data;
  if(ano == undefined && bairro == undefined && situacao == undefined){
    data = await controller.getTodosChamados();
  }
  else if(ano != undefined && bairro == undefined && situacao == undefined){
    data = await controller.getTodosChamados1(ano)
  }
  else if (ano == undefined && bairro != undefined && situacao == undefined){
    data = await controller.getTodosChamados2(bairro);
  }
  else if (ano == undefined && bairro == undefined && situacao != undefined){
    data = await controller.getTodosChamados3(situacao);
  }
  else if (ano != undefined && bairro == undefined && situacao != undefined){
    data = await controller.getTodosChamados4(situacao, ano);
  }
  else if (ano != undefined && bairro != undefined && situacao == undefined){
    data = await controller.getTodosChamados5(ano, bairro);
  }
  else if (ano == undefined && bairro != undefined && situacao != undefined){
    data = await controller.getTodosChamados6(bairro, situacao);
  }
  else{
    data = await controller.getTodosChamados7(bairro, ano, situacao);
  }
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
//bairros para os filtros
router.get('/Bairros', async (req, res) => {
  const data =  await controller.getTodosBairros();
  res.json({
    data,
  });
});
//servicos para os filtros
router.get('/Descricao', async (req, res) => {
  const data =  await controller.getDescricao();
  res.json({
    data,
  });
});

//SERVICOS RECORRENTES, OBRIGATÓRIO FILTRO DE BAIRRO e POSSIBILIDADE DE FILTRO DE ANO
router.get('/Insidencia', async (req, res) => {
  const descricao = req.query.descricao;
  const ano = req.query.ano;
  let data;
  if(descricao != undefined && ano == undefined ){
    data = await controller.getInsidenciaServico(descricao);
  }
  else if(descricao == undefined && ano == undefined ) {
    throw new Exception("QUEBROU")
  }
  else {
    data = await controller.getInsidenciaServico1(descricao, ano);
  }
  res.json({
    definition: `Maior incidência de ${descricao} ${ano ? 'em: ' + ano : '' }`,
    data,
  });
});

module.exports = router;
