const express = require('express');
const pool = require('../config/configdb');
const Usuario = require('../Models/userModel');
const Validacoes = require('../utils/validators.js');
const app = express();
const cors = require('cors');
app.use(cors()); 


const UsuarioController = {
  cadastrar: async (req, res) => {
    const dados = req.body;

    const { valido, mensagem } = Validacoes.validarCadastro(dados);
    if (!valido) {
      return res.status(400).json({ erro: mensagem });
    }

    try {
      await Usuario.criar(dados);
      return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);

      // Verifica se foi erro de duplicação de chave (email ou cpf)
      if (error.code === 'ER_DUP_ENTRY') {
        const campo = error.sqlMessage.includes('email') ? 'Email' :
                      error.sqlMessage.includes('cpf') ? 'CPF' : 'Campo único';
        return res.status(409).json({ erro: `${campo} já está cadastrado.` });
      }

      // Qualquer outro erro
      return res.status(500).json({ erro: 'Erro interno ao cadastrar usuário.' });
    }
  },

  logar: async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o email foi enviado
    const { valido, mensagem } = Validacoes.validarLogin(email, senha);
    if (!valido) {
      return res.status(400).json({ erro: mensagem });
    }

    let rows;

    try {
      rows = await Usuario.buscarPorEmail(email);
    } catch (erroQuery) {
      console.error('Erro ao consultar o banco de dados:', erroQuery);
      return res.status(500).json({ mensagem: 'Erro ao acessar o banco de dados.' });
    }

    if (!rows) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const usuario = rows[0];

    if (usuario.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    // Login OK
    res.status(200).json({ mensagem: 'Login bem-sucedido!', usuario });

  } catch (erroGeral) {
    console.error('Erro inesperado no login:', erroGeral);
    res.status(500).json({ mensagem: 'Erro inesperado no servidor.' });
  }
},

   
  //função de deletar um usuário
  deletar: async (req, res) => {
    const { email } = req.body;

    try {
      const rows = await Usuario.buscarPorEmail(email);

      if (!rows) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
      }

      await Usuario.deletar({ email });
      res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });

    } catch (err) {
      //aqui tá pra pegar erro no interno
      console.error(err);
      res.status(500).json({ mensagem: 'Erro no servidor!' });
    }
  }, 

  //função de atualizar um usuário
  atualizar: async (req, res) => {
    const { email, senha, nome, celular } = req.body;

    try {
      //verifica se o email do infeliz tá cadastrado
      const rows = await Usuario.buscarPorEmail(email);
      //se tiver, pega o usuário
      if (!rows) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
      }

        await Usuario.atualizar({ email, senha, nome, celular });
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' });

    } catch (err) {
      //aqui tá pra pegar erro no interno
      console.error(err);
      res.status(500).json({ mensagem: 'Erro no servidor!' });
    }
  },

  buscarPorEmail: async (req, res) => {
    const email = req.params.email; // ou req.params.email se usar rota dinâmica
    try {
      const usuario = await Usuario.buscarPorEmail(email);

      if (usuario) {
        res.json(usuario); // mostra a row como JSON no Thunder Client
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  }
};


module.exports = UsuarioController;