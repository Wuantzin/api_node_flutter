const { atualizarEmail } = require('../Controllers/userController.js');
const User = require('../Models/userModel.js');

const userService = {
  cadastrarUsuario: async (dados) => {
    try {
      await User.criar(dados);
      return { status: 201, mensagem: 'Usuário cadastrado com sucesso!' };


    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);

          if (error.code === 'ER_DUP_ENTRY') {
      const campo = error.sqlMessage.includes('email') ? 'Email' :
                    error.sqlMessage.includes('cpf') ? 'CPF' : 'Campo único';
      return { status: 409, mensagem: `${campo} já está cadastrado.` };
      }
    }
    return { status: 500, mensagem: 'Erro interno ao cadastrar usuário.' };
  },

  logarUsuario: async ({email, senha}) => {
    try {
      
      let rows;

      try {
        rows = await User.buscarPorEmail(email);
      } catch (erroQuery) {
        console.error('Erro ao consultar o banco de dados:', erroQuery);
        return { status: 500, mensagem: 'Erro ao acessar o banco de dados.' };
      }
      if (!rows || rows.length === 0) {
        return { status: 404, mensagem: 'Usuário não encontrado.' };
      }

      const usuario = rows;

      if (usuario.senha !== senha) {
        return { status: 401, mensagem: 'Senha incorreta.' };
      }

      // Login OK
      return { status: 200, mensagem: 'Login bem-sucedido!', usuario };

    } catch (erroGeral) {
      console.error('Erro inesperado no login:', erroGeral);
      return { status: 500, mensagem: 'Erro inesperado no servidor.' };
    }
  },

  deletarUsuario: async ({email}) => {
    try {
      const rows = await User.buscarPorEmail(email);

      if (!rows || rows.length === 0) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.deletar({email});
      return { status: 200, mensagem: 'Usuário deletado com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  },

  atualizarUsuario: async ({email, senha, nome, celular}) => {
    try {
      const rows = await User.buscarPorEmail(email);

      if (!rows || rows.length === 0) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.atualizar({email, senha, nome, celular});
      return { status: 200, mensagem: 'Usuário atualizado com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  },

  atualizarNomeUsuario: async ({nome, email}) => {
    try {
      console.log(`Tentando atualizar nome do usuário com email: ${email} para ${nome}`);
      const id = await User.getIdByEmail(email);
      console.log(`ID do usuário encontrado: ${id}`);

      if (!id) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.atualizarNome({ id, nome });
      return { status: 200, mensagem: 'Nome atualizado com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  },

  atualizarEmailUsuario: async ({email, novoEmail}) => {
    try {
      console.log(`Tentando atualizar email do usuário com email: ${email} para ${novoEmail}`);
      const id = await User.getIdByEmail(email);
      console.log(`Usuário encontrado: ${id}`);
      if (!id) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.atualizarEmail({ id, novoEmail });
      return { status: 200, mensagem: 'Email atualizado com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  }
}

module.exports = userService;
