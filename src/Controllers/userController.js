const express = require('express');
const pool = require('../config/configdb.js');
const Usuario = require('../Models/userModel.js');
const Validacoes = require('../Utils/validators.js');
const userService = require('../Services/userService.js');
const app = express();
const cors = require('cors');
const e = require('express');
app.use(cors()); 


const UsuarioController = {
  cadastrar: async (req, res) => {
    const dados = req.body;

    const { valido, mensagem } = Validacoes.validarCadastro(dados);
    if (!valido) {
      return res.status(400).json({ erro: mensagem });
    }

    const resposta = await userService.cadastrarUsuario(dados);
    return res.status(resposta.status).json(resposta.mensagem);
  },

  logar: async (req, res) => { 
    const { email, senha } = req.body;

    const { valido, mensagem } = Validacoes.validarLogin({email, senha});
    if (!valido) {
      return res.status(400).json({ erro: mensagem });
    }

    const resposta = await userService.logarUsuario({ email, senha });
    return res.status(resposta.status).json({ erro: resposta.mensage, dados: resposta.usuario });

},

  deletar: async (req, res) => {
    const { email } = req.body;
    console.log(email)
    const { valido, mensagem } = Validacoes.validarEmail({email});
    if (!valido) {
      return res.status(400).json({mensagem });
    }

    const resposta = await userService.deletarUsuario({email});
    return res.status(resposta.status).json(resposta.mensagem);

  }, 

  atualizar: async (req, res) => {
    const { email, nome, senha, celular, novo_email } = req.body;
    console.log ("email:", email, "novo email:", novo_email, "nome:", nome, "senha:", senha, "celular:", celular)

    const resposta = await userService.atualizarUsuario({ email, senha, nome, celular, novo_email });
    return res.status(resposta.status).json(resposta.mensagem );

  },

  atualizarNome: async (req, res) => {
    const { nome, email } = req.body;

    const resposta = await userService.atualizarNomeUsuario({ nome, email });
    return res.status(resposta.status).json(resposta.mensagem);
  },

  atualizarEmail: async (req, res) => {
    const { email, novoEmail } = req.body;

    const { valido, mensagem } = Validacoes.validarEmail({ email: novoEmail });
    if (!valido) {
      return res.status(400).json(mensagem);
    }

    const resposta = await userService.atualizarEmailUsuario({ email: email, novoEmail: novoEmail });
    return res.status(resposta.status).json(resposta.mensagem );
  },

  atualizarSenha: async (req, res) => {
    const { email, senha } = req.body;

    const { valido, mensagem } = Validacoes.validarSenha({ senha });
    if (!valido) {
      return res.status(400).json(mensagem);
    }

    const resposta = await userService.atualizarSenhaUsuario({ email, senha });
    return res.status(resposta.status).json(resposta.mensagem);
  },

  buscarPorEmail: async (req, res) => {
    const email = req.params.email;
    try {
      const usuario = await Usuario.buscarPorEmail(email);

      if (usuario) {
        return res.json(usuario); 
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },

  buscarPorNome: async (req, res) => {
    const nome = req.params.nome; 

    try {
      const rows = await Usuario.buscarPorNome(nome);

      if (rows) {
        return res.json(rows); 
      } else {
        res.status(404).json({ mensagem: 'Nenhum usuário encontrado com esse nome.' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },

  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await userService.listarUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
  },

  listarLogs: async (req, res) => {
    try {
      console.log('buscando log')
      const logs = await userService.listarLogs();
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar Logs.'});
    }
  },

  listarLogsPorUsuario: async (req, res) => {
    const {nome} = req.body;

    const resposta = await userService.listarLogsPorUsuario(nome);
    return res.status(resposta.status).json(resposta.logs || { mensagem: resposta.mensagem });
  },

  listarLogsPorAcao: async (req, res) => {
    const { acao } = req.body;

    const resposta = await userService.listarLogsPorAcao(acao);
    return res.status(resposta.status).json(resposta.logs || { mensagem: resposta.mensagem });
  }
};


module.exports = UsuarioController;