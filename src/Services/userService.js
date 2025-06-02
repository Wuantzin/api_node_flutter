const User = require('../Models/userModel.js');
const errorHandler = require('../Utils/error_handler.js');

const userService = {
  cadastrarUsuario: async (dados) => {
    try {
      await User.criar(dados);
      return { status: 201, mensagem: 'Usuário cadastrado com sucesso!' };


    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      let mensagem = errorHandler.error_DupEntry(error);
      return { status: 500, mensagem: mensagem || 'Erro ao cadastrar usuário.' };
      }
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
      const id = await User.getIdByEmail(email);
      if (!id) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.deletar({id});
      return { status: 200, mensagem: 'Usuário deletado com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  },

  atualizarUsuario: async ({email, nome, senha, celular, novo_email}) => {
    try {
      const rows = await User.buscarPorEmail(email);

      if (!rows || rows.length === 0) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.atualizar({email, nome, senha, celular, novo_email});
      return { status: 200, mensagem: 'Usuário atualizado com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  },

  atualizarNomeUsuario: async ({nome, email}) => {
    try {
      const id = await User.getIdByEmail(email);

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
      const id = await User.getIdByEmail(email);
      if (!id) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.atualizarEmail({ id, novoEmail });
      return { status: 200, mensagem: 'Email atualizado com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  },

  atualizarSenhaUsuario: async ({email, senha}) => {
    try {
      const id = await User.getIdByEmail(email);
      if (!id) {
        return { status: 404, mensagem: 'Usuário não encontrado!' };
      }

      await User.atualizarSenha({ id, senha });
      return { status: 200, mensagem: 'Senha atualizada com sucesso!' };

    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro no servidor!' };
    }
  },

  listarUsuarios: async () => {
      return await User.getAllUsuarios();
  },

  listarLogs: async () => {
    return await User.getAllLogs();
  },

  listarLogsPorUsuario: async (nome) => {
    try {
      const logs = await User.getLogByUsuario(nome);
      if (!logs || logs.length === 0) {
        return { status: 404, mensagem: 'Nenhum log encontrado para este usuário.' };
      }
      return { status: 200, logs };
    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro ao buscar logs do usuário.' };
    }
  },

  listarLogsPorAcao: async (acao) => {
    try {
      const logs = await User.getLogByAcao(acao);
      if (!logs || logs.length === 0) {
        return { status: 404, mensagem: 'Nenhum log encontrado para esta ação.' };
      }
      return { status: 200, logs };
    } catch (err) {
      console.error(err);
      return { status: 500, mensagem: 'Erro ao buscar logs por ação.' };
    }
  },
}

module.exports = userService;
