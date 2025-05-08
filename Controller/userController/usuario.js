const express = require('express');
const db = require('../../config/configdb');
const Usuario = require('../../Model/userModel/usuario');
const app = express();

const UsuarioController = {
    //função de cadastrar um usuário
    cadastrar: async (req, res) => {
      const { nome, email, senha } = req.body;
        
      //vendo se tá tudo preenchido pra não dar zebra
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }
      
      //retorno para ver se foi cadastrado certin
      try {
        await Usuario.criar({ nome, email, senha});
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
      }
    },
};


module.exports = UsuarioController;