const db = require('../config/configdb');


const Usuario = {
    //query para criar o usuario no banco de dados
    criar: async (dados) => {
      const {email, senha, nome, cpf, celular} = dados;
      const query = 'CALL prc_inserir_usuario(?, ?, ?, ?, ?)';
      return db.execute(query, [ email, senha, nome, cpf, celular ]);
    },

    deletar: async (dados) => {
      const { email } = dados;
      const query = 'DELETE FROM usuarios WHERE email = ?';
      return db.execute(query, [email]);

    
    },

    atualizar: async (dados) => {
      const { id, email, senha, nome, celular } = dados;
      const query = 'CALL prc_atualizar_usuario(?, ?, ?, ?, ?)';
      return db.execute(query, [email, senha, nome, celular]);
    },

    buscarPorEmail: async (email) => {
      const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
      return rows.length > 0 ? rows[0] : null;
    },

    buscarPorNome: async (nome) => {
      const [rows] = await db.execute('SELECT * FROM usuarios WHERE LOWER(nome) LIKE ?',[`%${nome.toLowerCase()}%`]);
      return rows.length > 0 ? [rows] : null;
    }
}

module.exports = Usuario;
 