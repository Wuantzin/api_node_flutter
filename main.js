const express = require('express');
const app = express();
const User = require('./src/Controllers/userController.js');
const Adm = require('./src/Controllers/admController.js');
app.use(express.json());


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });



  app.post('/cadastrar', User.cadastrar);
  app.post('/logar', User.logar);
  app.post('/logar/adm', Adm.logarAdm);
  app.put('/atualizar/nome', User.atualizarNome);
  app.put('/atualizar/email', User.atualizarEmail);
  app.put('/deletar', User.deletar);
  app.put('/atualizar', User.atualizar);
  app.get('/buscar/email/:email', User.buscarPorEmail);
  app.get('/buscar/nome/:nome', User.buscarPorNome);
  app.get('/usuarios', User.listarUsuarios);
  app.get('/logs/usuario', User.listarLogsPorUsuario);
  app.get('/logs/acao', User.listarLogsPorAcao);
