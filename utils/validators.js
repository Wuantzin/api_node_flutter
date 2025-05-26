const Validacoes = {
  validarCadastro: ({ nome, email, senha, cpf, celular }  = {}) => {
    try {
      if (!nome || !email || !senha || !cpf || !celular) {
        return { valido: false, mensagem: 'Todos os campos são obrigatórios.' };
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        return { valido: false, mensagem: 'Email inválido.' };
      }

      if (senha.length < 6) {
        return { valido: false, mensagem: 'A senha deve ter pelo menos 6 caracteres.' };
      }

      return { valido: true };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  },

  validarLogin: ({ email, senha }) => {
    if (!email || !senha) {
      return { valido: false, mensagem: 'Email e senha são obrigatórios.' };
    }
    return { valido: true };
  },
};

module.exports = Validacoes;