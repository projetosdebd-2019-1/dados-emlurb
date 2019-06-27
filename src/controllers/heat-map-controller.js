const database = require('../config/database');

module.exports = {
  getMenorAtuacao1(ano) {
    console.log('epa')
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng
      from endereco, chamado
      where endereco.codigo = chamado.codigoEndereco
      and situacao = 'PENDENTE'
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and endereco.bairro
      in (select * from (select bairro
      from endereco, chamado
      where chamado.situacao = 'PENDENTE'
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and chamado.codigoEndereco = endereco.codigo
      group by bairro
      order by count(logradouro) DESC LIMIT 3) temp_tab);
      `, (err, rows, fields) => {
        resolve(rows);
      });
    });
  },

  getMenorAtuacao() {
    return new Promise((resolve, reject) => {
      database.query(`
      select
        lat,
        lng
      from
        endereco,
        chamado
      where
        endereco.codigo = chamado.codigoEndereco
        and situacao = 'PENDENTE'
        and endereco.bairro in (
          select
              *
          from (
            select
              bairro
            from
              endereco,
              chamado
            where
              chamado.situacao = 'PENDENTE'
              and chamado.codigoEndereco = endereco.codigo
            group by
              bairro
            order by
              count(logradouro) DESC LIMIT 3
          )
          temp_tab
        );
      `, (err, rows, fields) => {
        resolve(rows);
      });
    });
  },

  getMaisRecorrentes(bairro) {
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng, descricao from endereco, servico, chamado
      where chamado.codigoServico = servico.id
      and endereco.codigo = chamado.codigoEndereco
      and endereco.bairro = '${bairro}'
      and servico.descricao in (select * from (select servico.descricao from chamado, endereco, servico
      where chamado.codigoEndereco = endereco.codigo
      and chamado.codigoServico = servico.id
      and bairro = '${bairro}'
      group by servico.descricao
      order by count(servico.descricao) DESC LIMIT 3) temp_tab);
      `, (err, rows, fields) => {
        resolve(rows);
      });
    });
  },

  getSitucoes(){
    return new Promise((resolve, reject) => {
      database.query(`SELECT DISTINCT(situacao) FROM chamado;`, (err, rows, fields) => {
        resolve(rows);
      });
    });
  },

  getMaisRecorrentes1(bairro, ano) {
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng, descricao from endereco, servico, chamado
      where chamado.codigoServico = servico.id
      and endereco.codigo = chamado.codigoEndereco
      and endereco.bairro = '${bairro}'
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and servico.descricao in (select * from (select servico.descricao from chamado, endereco, servico
      where chamado.codigoEndereco = endereco.codigo
      and chamado.codigoServico = servico.id
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and bairro = '${bairro}'
      group by servico.descricao
      order by count(servico.descricao) DESC LIMIT 3) temp_tab);
      `, (err, rows, fields) => {
        resolve(rows);
      });
    });
  },

  getTodosChamados() {
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo;
      `, (err, rows, fields) => {
        resolve(rows);
      });
    });
  },

  getTodosChamados1(ano){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo
      and EXTRACT(YEAR from dataDemanda) = ${ano};
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getTodosChamados2(bairro){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo
      and bairro = '${bairro}';
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getTodosChamados3(situacao){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo
      and situacao = '${situacao}';
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getTodosChamados4(situacao, ano){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and situacao = '${situacao}';
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getTodosChamados5(ano, bairro){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and bairro = '${bairro}';
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getTodosChamados6(bairro, situacao){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo
      and bairro = '${bairro}'
      and situacao = '${situacao}';
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getTodosChamados7(bairro, ano, situacao){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng from chamado, endereco
      where chamado.codigoEndereco = endereco.codigo
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and bairro = '${bairro}'
      and situacao = '${situacao}';
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getTodosBairros(){
    return new Promise((resolve, reject) => {
      database.query(`
      select distinct(bairro) from endereco;
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getDescricao(){
    return new Promise((resolve, reject) => {
      database.query(`
      select descricao from servico;
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getInsidenciaServico(descricao){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng, bairro from endereco, servico, chamado
      where chamado.codigoEndereco = endereco.codigo
      and chamado.codigoServico = servico.id
      and servico.descricao = '${descricao}'
      and bairro in (select * from (select bairro from chamado, endereco, servico
      where chamado.codigoEndereco = endereco.codigo
      and chamado.codigoServico = servico.id
      and servico.descricao = '${descricao}'
      group by bairro
      order by count(servico.descricao) DESC LIMIT 1) table_temp);
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },

  getInsidenciaServico1(descricao, ano){
    return new Promise((resolve, reject) => {
      database.query(`
      select lat, lng, bairro from endereco, servico, chamado
      where chamado.codigoEndereco = endereco.codigo
      and chamado.codigoServico = servico.id
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and servico.descricao = '${descricao}'
      and bairro in (select * from (select bairro from chamado, endereco, servico
      where chamado.codigoEndereco = endereco.codigo
      and chamado.codigoServico = servico.id
      and EXTRACT(YEAR from dataDemanda) = ${ano}
      and servico.descricao = '${descricao}'
      group by bairro
      order by count(servico.descricao) DESC LIMIT 1) table_temp);
      `, (err, rows, fields) => {
        resolve(rows);
      });
    })
  },




};
