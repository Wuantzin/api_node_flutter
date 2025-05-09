// Conexão com o MySQL
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '124356879bB*',
    database: 'mega',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

// Verifica se a conexão deu bom
pool.getConnection()
  .then(connection => {
    console.log('Conectado ao MySQL via Pool!');
    connection.release(); // devolve ao pool
  })
  .catch(err => {
    console.error('Erro ao conectar no MySQL:', err);
  });