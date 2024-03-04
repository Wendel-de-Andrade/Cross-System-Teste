import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db/pool';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        const { nome, email, senha } = body;

        // Certifique-se de que todos os campos necessários foram fornecidos.
        if (!nome || !email || !senha) {
          res.status(400).json({ error: 'Parâmetros insuficientes fornecidos.' });
          return;
        }

        // Encriptar a senha antes de salvar no banco de dados
        const salt = await bcrypt.genSalt(10);
        const senhaEncriptada = await bcrypt.hash(senha, salt);

        // Execute a consulta para inserir o novo usuário
        const insertResult = await pool.query(
          'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
          [nome, email, senhaEncriptada]
        );

        // Verifique se a consulta foi bem-sucedida
        if (insertResult.rowCount && insertResult.rowCount > 0) {
          const novoUsuario = insertResult.rows[0];
          res.status(201).json({ usuario: novoUsuario });
        } else {
          res.status(500).json({ message: 'Erro ao criar o usuário.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor.' });
        console.error('Erro ao cadastrar usuário:', error);
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
