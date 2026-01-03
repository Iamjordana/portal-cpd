const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  / coloque sua senha se tiver
  database: 'portal_cpd'
});

connection.connect(err => {
  if (err) {
    console.error('Erro MySQL:', err);
  } else {
    console.log('✅ MySQL conectado');
  }
});

module.exports = connection;