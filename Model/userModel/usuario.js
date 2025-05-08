const db = require('../../config/configdb');


const Usuario = {
    //query para criar o usuario no banco de dados
    criar: async (dados) => {
      const { nome, email, senha } = dados;
      const query = 'CALL inserir_usuario(?, ?, ?)';
      return db.execute(query, [nome, email, senha]);
    }
};

module.exports = Usuario;
