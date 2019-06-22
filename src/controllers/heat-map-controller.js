const database = require('../config/database');

module.exports = {

  get() {
    return new Promise((resolve, reject) => {
      database.query(`
      select
        lat,
        lng situacao,
        bairro
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

};
