import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db/pool';

// Formata o CPF para ter as pontuações
function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Formata a data de cadastro (DD/MM/AAAA)
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

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
  const { id, nome, email, cpf } = req.body;

  try {
    switch (method) {
      case 'GET':
        const getAll = await queryDatabase('SELECT * FROM clientes');
        const formattedGetAll = getAll.rows.map(cliente => ({
          ...cliente,
          cpf: formatCPF(cliente.cpf),
          data_de_cadastro: formatDate(cliente.data_de_cadastro)
        }));
        res.status(200).json(formattedGetAll);
        break;
        
      case 'POST':
        const postResult = await queryDatabase(
          'INSERT INTO clientes (nome, email, cpf) VALUES ($1, $2, $3) RETURNING *',
          [nome, email, cpf]
        );
        res.status(201).json(postResult.rows[0]);
        break;

      // case 'PUT':
      //   const putResult = await queryDatabase(
      //     'UPDATE clientes SET nome = $1, email = $2, cpf = $3 WHERE id = $4 RETURNING *',
      //     [nome, email, cpf, id]
      //   );
      //   res.status(200).json(putResult.rows[0]);
      //   break;

      // case 'DELETE':
      //   await queryDatabase('DELETE FROM clientes WHERE id = $1', [id]);
      //   res.status(200).json({ message: `Cliente com ID ${id} foi excluído.` });
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
