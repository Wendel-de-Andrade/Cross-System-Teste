import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db/pool';


async function queryDatabase(queryText: string, params?: any[]) {
  try {
    const results = await pool.query(queryText, params);
    return results;
  } catch (error) {
    // Verifica se 'error' é uma instância de 'Error'
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    // Se não for um 'Error', lança um erro genérico
    throw new Error('Ocorreu um erro desconhecido ao acessar o banco de dados');
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id, nome, valor_unitario, quantidade } = req.body;

  try {
    switch (method) {
      case 'GET':
        const getAll = await queryDatabase('SELECT * FROM produtos');
        const formattedGetAll = getAll.rows.map(produto => ({
          ...produto,
          valor_unitario: `R$${Number(produto.valor_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).slice(3)}`
        }));
        res.status(200).json(formattedGetAll);
        break;
        
      case 'POST':
        const postResult = await queryDatabase(
          'INSERT INTO produtos (nome, valor_unitario, quantidade) VALUES ($1, $2, $3) RETURNING *',
          [nome, valor_unitario, quantidade]
        );
        res.status(201).json(postResult.rows[0]);
        break;

      // case 'PUT':
      //   const putResult = await queryDatabase(
      //     'UPDATE produtos SET nome = $1, valor_unitario = $2, quantidade = $3 WHERE id = $4 RETURNING *',
      //     [nome, valor_unitario, quantidade, id]
      //   );
      //   res.status(200).json(putResult.rows[0]);
      //   break;

      // case 'DELETE':
      //   await queryDatabase('DELETE FROM produtos WHERE id = $1', [id]);
      //   res.status(200).json({ message: `produto com ID ${id} foi excluído.` });
      //   break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Ocorreu um erro desconhecido' });
    }
  }
}
