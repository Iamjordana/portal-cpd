const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123@root',
  database: 'portal_cpd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
// Teste de conexão
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL conectado com sucesso');
    conn.release(); // libera a conexão de teste
  })
  .catch(err => {
    console.error('Erro MySQL:', err);
  });

module.exports = pool;
