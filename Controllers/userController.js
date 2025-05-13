const express = require('express');
const pool = require('../config/configdb');
const Usuario = require('../Models/userModel');
const app = express();
const cors = require('cors');
app.use(cors()); 


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

  //função de logar um usuário
  logar: async (req, res) => {
    const { email, senha } = req.body;

    try {
      //verifica se o email do infeliz tá cadastrado
      const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

      //se tiver, pega o usuário
      if (rows.length > 0) {
        const usuario = rows[0];

        // Compara a senha e retorna o status
        if (usuario.senha === senha) {
          res.status(200).json({ mensagem: 'Login bem-sucedido!', usuario });
        } else {
          res.status(401).json({ mensagem: 'Senha incorreta!' });
        }

      } else {
        //se não tiver, retorna que não tá cadastrado
        res.status(404).json({ mensagem: 'Usuário não encontrado!' });
      }

    } catch (err) {
      //aqui tá pra pegar erro no interno
      console.error(err);
      res.status(500).json({ mensagem: 'Erro no servidor!' });
    }
  }
};


module.exports = UsuarioController;