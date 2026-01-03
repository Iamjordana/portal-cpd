const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: '123@root',       
  database: 'portal_cpd'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
});

connection.connect(err => {
  if (err) {
    console.error('Erro MySQL:', err);
  } else {
    console.log('✅ MySQL conectado com sucesso');
  }
});

module.exports = connection;
