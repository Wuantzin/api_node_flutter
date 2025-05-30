const db = require('../config/configdb');


const Usuario = {
    //query para criar o usuario no banco de dados
    criar: async (dados) => {
      const {nome, email, senha, cpf, celular} = dados;
      const query = 'CALL prc_inserir_usuario(?, ?, ?, ?, ?, ?)';
      return db.execute(query, [ nome, email, senha, cpf, celular, email]);
    },

    deletar: async (dados) => {
      const { id } = dados;
      const query = 'CALL prc_excluir_usuario(?)';
      return db.execute(query, [id]);
    },

    atualizar: async (dados) => {
      const { email, nome, senha, celular, novo_email } = dados;
      const query = 'CALL prc_atualizar_usuario(?, ?, ?, ?, ?)';
      return db.execute(query, [email, nome, senha, celular, novo_email]);
    },

    buscarPorEmail: async (email) => {
      const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
      return rows.length > 0 ? rows[0] : null;
    },

    buscarPorNome: async (nome) => {
      const [rows] = await db.execute('SELECT * FROM usuarios WHERE LOWER(nome) LIKE ?',[`%${nome.toLowerCase()}%`]);
      return rows.length > 0 ? [rows] : null;
    },

    atualizarNome: async (dados) => {
      const { id, nome } = dados;
      const query = 'CALL prc_atualizar_nome(?, ?)';
      return db.execute(query, [nome, id]);
    },

    atualizarEmail: async (dados) => {
      const { id, novoEmail } = dados;
      const query = 'CALL prc_atualizar_email(?, ?)';
      return db.execute(query, [id, novoEmail]);
    },

    atualizarSenha: async (dados) => {
      const { id, senha } = dados;
      const query = 'CALL prc_atualizar_senha(?, ?)';
      return db.execute(query, [id, senha]);
    },

    getIdByEmail: async (email) => {
      console.log(email);
      const [rows] = await db.execute('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);
      console.log(rows[0]);
      return rows.length > 0 ? rows[0].id_usuario : null;
      console.log('ID do usuário encontrado:', rows[0].id_usuario);
    },

    getIdByNome: async (nome) => {
      const [rows] = await db.execute('SELECT id_usuario FROM usuarios WHERE nome = ?', [nome.toLowerCase()]);
      return rows.length > 0 ? rows[0].id_usuario : null;
    },

    getLogByUsuario: async (nome) => {
      console.log(nome);
      const [rows] = await db.execute(`SELECT * FROM logs WHERE usuario = ?`, [nome]);
      console.log('Logs do usuário encontrados:', rows);
      return rows.length > 0 ? rows : null;
    },

    getLogById: async (id) => {
      const [rows] = await db.execute('SELECT * FROM logs WHERE id_usuario = ?', [id]);
      return rows.length > 0 ? rows : null;
    },

    getLogByAcao: async (acao) => {
      const [rows] = await db.execute('SELECT * FROM logs WHERE LOWER(acao) = ?', [acao.toLowerCase()]);
      return rows.length > 0 ? rows : null;
    },

    getAllUsuarios: async () => {
      const [rows] = await db.execute('SELECT * FROM usuarios');
      return rows.length > 0 ? rows : null;
    },
}

module.exports = Usuario;
 