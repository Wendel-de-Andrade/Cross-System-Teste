import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../pages/api/db/pool'; // Ajuste o caminho conforme necessário

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
    body,
  } = req;

  // console.log('Requisição recebida para ID:', id); // Log o ID da requisição
  // console.log('Corpo da requisição:', body); // Log o corpo da requisição

  switch (method) {
    case 'GET':
      // Lógica para obter um único produto pelo ID
      try {
        const getResult = await pool.query(
          'SELECT * FROM produtos WHERE id = $1',
          [id]
        );
        if (getResult.rows.length > 0) {
          const formattedResult = {
            ...getResult.rows[0],
          };
          res.status(200).json(formattedResult);
        } else {
          res.status(404).json({ message: 'Produto não encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
      }
      break;

    case 'PUT':
      try {
        // Desestruture os campos do corpo da requisição.
        const { nome, valor_unitario, quantidade } = body;

        // Certifique-se de que todos os campos necessários foram fornecidos.
        if (!nome || !valor_unitario || !quantidade) {
          res.status(400).json({ error: 'Parâmetros insuficientes fornecidos.' });
          return;
        }

        // Execute a consulta para atualizar o produto.
        const updateResult = await pool.query(
          'UPDATE produtos SET nome = $1, valor_unitario = $2, quantidade = $3 WHERE id = $4 RETURNING *',
          [nome, valor_unitario, quantidade, id] // Os valores devem corresponder à ordem dos $ placeholders.
        );

        // Verifique se a consulta foi bem-sucedida
        if (updateResult.rowCount && updateResult.rowCount > 0) {
          // Formate o resultado para devolver ao produto
          const updatedProduto = updateResult.rows[0];
          res.status(200).json({
            ...updatedProduto,
          });
        } else {
          res.status(404).json({ message: 'Produto não encontrado para atualizar.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor.' });
        console.error('Erro ao atualizar produto:', error);
      }
      break;

    case 'DELETE':
      try {
        const deleteResult = await pool.query(
          'DELETE FROM produtos WHERE id = $1',
          [id]
        );

        // Usando o operador de encadeamento opcional e o operador de coalescência nula
        const rowCount = deleteResult?.rowCount ?? 0;

        if (rowCount > 0) {
          res.status(200).json({ message: 'Produto excluído com sucesso.' });
        } else {
          res.status(404).json({ message: 'Produto não encontrado para excluir.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir produto.' });
        console.error('Erro ao excluir produto:', error);
      }
      break;
    // Adicione os métodos PUT e DELETE aqui, se necessário

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
