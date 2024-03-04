// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db/pool';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === 'POST') {
    const { email, senha } = body;

    try {
      // Verifica se o e-mail existe no banco de dados
      const userResult = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );

      if (userResult.rows.length > 0) {
        const usuario = userResult.rows[0];

        // Compara a senha fornecida com a encriptada no banco de dados
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (senhaValida) {
          // Senha correta, login bem-sucedido
          res.status(200).json({ mensagem: 'Login bem-sucedido!' });
        } else {
          // Senha incorreta
          res.status(401).json({ erro: 'Credenciais inválidas.' });
        }
      } else {
        // E-mail não encontrado
        res.status(404).json({ erro: 'Usuário não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ erro: 'Erro interno do servidor.' });
      console.error('Erro ao tentar fazer login:', error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
