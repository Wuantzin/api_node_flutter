const express = require('express');
const pool = require('./config/configdb.js');
const Usuario = require('./Models/userModel.js');
const app = express();
app.use(express.json());
const UsuarioController = require('./Controllers/userController.js');
const admController = require('./Controllers/admController.js');
const Validacoes = require('./utils/validators.js');


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });



  app.post('/cadastrar', UsuarioController.cadastrar);
  app.post('/logar', UsuarioController.logar);
  app.post('logar/adm', admController.logarAdm);
  app.put('/deletar', UsuarioController.deletar);
  app.put('/atualizar', UsuarioController.atualizar);
  app.get('/buscar/:email', UsuarioController.buscarPorEmail);