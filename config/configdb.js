const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'mega'
});

// Verifica se a conexão deu bom
db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      return;
    }
    console.log('Conectado ao MySQL!');
  });

module.exports = db;