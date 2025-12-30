const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // ajuste se seu usuário for outro
  password: '123@root',        // senha do MySQL
  database: 'portal_cpd'
});

connection.connect(err => {
  if (err) {
    console.error('Erro MySQL:', err);
  } else {
    console.log('✅ MySQL conectado com sucesso');
  }
});

module.exports = connection;
