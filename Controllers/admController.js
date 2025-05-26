const express = require('express');
const pool = require('../config/configdb');
const Usuario = require('../Models/userModel');

const admController = {

    logarAdm: async (req, res) => {
    const { email, senha } = req.body;

    try {
        const { valido, mensagem } = Validacoes.validarLogin(dados);
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

        if (rows.length === 0) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const usuario = rows[0];

        // Verifica se o usuário é realmente um administrador
        if (usuario.np !== 'A') {
        return res.status(403).json({ mensagem: 'Acesso negado. Esta conta não é de um administrador.' });
        }

        // Verifica a senha
        if (usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta.' });
        }

        // Login OK
        res.status(200).json({ mensagem: 'Login de administrador bem-sucedido!', usuario });

    } catch (erroGeral) {
        console.error('Erro inesperado no login de administrador:', erroGeral);
        res.status(500).json({ mensagem: 'Erro inesperado no servidor.' });
    }
    }
}

module.exports = admController;