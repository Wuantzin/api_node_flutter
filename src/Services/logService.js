
const User = require('../Models/userModel.js');
const errorHandler = require('../Utils/error_handler.js');

const userService = {
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
  }
