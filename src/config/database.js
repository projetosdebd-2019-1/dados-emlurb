const { createConnection } = require('mysql');

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PWD,
  DB_DATABASE,
} = process.env;

const database = createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_DATABASE,
});

database.connect((err) => {
  if (err) throw err;

  console.log('>> Connected to database');
});

module.exports = database;
