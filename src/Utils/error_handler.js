const error_DupEntry = (error) => {
    if (error.code === 'ER_DUP_ENTRY') {
      const campo = error.sqlMessage.includes('email') ? 'Email' :
                    error.sqlMessage.includes('cpf') ? 'CPF' : 'Campo único';
      return { status: 409, mensagem: `${campo} já está cadastrado.` };
    }
}

module.exports = {error_DupEntry};
