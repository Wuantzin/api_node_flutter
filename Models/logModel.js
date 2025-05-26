const pool = require ('../config/configdb');

const Logs = {
    getLogs: async (res) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM logs');
            if (rows.length === 0) {
                return res.status(404).json({ mensagem: 'Nenhum log encontrado.' });
            }
            
            res.status(200).json(rows);
        } catch (error) {
            console.error('Erro ao buscar logs:', error);
            res.status(500).json({ mensagem: 'Erro ao buscar logs.' });
        }
    },

    getLogsByEmail: async (email, res) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM logs WHERE email = ?', [email]);
            if (rows.length === 0) {
                return res.status(404).json({ mensagem: 'Nenhum log encontrado para este email.' });
            }
            
            res.status(200).json(rows);
        } catch (error) {
            console.error('Erro ao buscar logs por email:', error);
            res.status(500).json({ mensagem: 'Erro ao buscar logs por email.' });
        }
    },

    getLogsByType: async (tipo, res) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM logs WHERE tipo = ?', [tipo]);
            if (rows.length === 0) {
                return res.status(404).json({ mensagem: 'Nenhum log encontrado para este tipo.' });
            }
            
            res.status(200).json(rows);
        } catch (error) {
            console.error('Erro ao buscar logs por tipo:', error);
            res.status(500).json({ mensagem: 'Erro ao buscar logs por tipo.' });
        }
    }
}
