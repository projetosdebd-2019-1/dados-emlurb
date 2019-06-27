const database = require('../config/database');

module.exports = {
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


};
