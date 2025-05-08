const express = require('express');
const db = require('./config/configdb.js');
const Usuario = require('./Model/userModel/usuario.js');
const app = express();
app.use(express.json());
const UsuarioController = require('./Controller/userController/usuario');


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });


// teste de funcionamento cadastro de usuario
  app.post('/usuarios', UsuarioController.cadastrar);