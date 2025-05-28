const db = require('../config/configdb');


const Usuario = {
    //query para criar o usuario no banco de dados
    criar: async (dados) => {
      const {nome, email, senha, cpf, celular} = dados;
      const query = 'CALL prc_inserir_usuario(?, ?, ?, ?, ?)';
      return db.execute(query, [ nome, email, senha, cpf, celular ]);
    },

    deletar: async (dados) => {
      const { email } = dados;
      const query = 'DELETE FROM usuarios WHERE email = ?';
      return db.execute(query, [email]);

    
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
      console.log(`Buscando usuário por nome: ${nome}`);
      const [rows] = await db.execute('SELECT * FROM usuarios WHERE LOWER(nome) LIKE ?',[`%${nome.toLowerCase()}%`]);
      console.log(`Usuários encontrados: ${rows.length}`);
      return rows.length > 0 ? [rows] : null;
    },

    atualizarNome: async (dados) => {
      const { id, nome } = dados;
      const query = 'CALL prc_atualizar_nome(?, ?)';
      return db.execute(query, [nome, id]);
    },

    atualizarEmail: async (dados) => {
      console.log(`Atualizando email do usuário com ID: ${dados.id}`);
      console.log(`Novo email: ${dados.email}`);
      const { id, novoEmail } = dados;
      const query = 'CALL prc_atualizar_email(?, ?)';
      return db.execute(query, [id, novoEmail]);
    },

    getIdByEmail: async (email) => {
      console.log(`Buscando ID do usuário com email: ${email}`);
      const [rows] = await db.execute('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);
      console.log(rows[0]);
      return rows.length > 0 ? rows[0].id_usuario : null;
    }
}

module.exports = Usuario;
 