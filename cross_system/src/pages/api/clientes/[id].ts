import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../pages/api/db/pool'; // Ajuste o caminho conforme necessário

// Formata o CPF para ter as pontuações
function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Formata a data de cadastro (DD/MM/AAAA)
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}


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
      // Lógica para obter um único cliente pelo ID
      try {
        const getResult = await pool.query(
          'SELECT * FROM clientes WHERE id = $1',
          [id]
        );
        if (getResult.rows.length > 0) {
          const formattedResult = {
            ...getResult.rows[0],
            cpf: formatCPF(getResult.rows[0].cpf),
            data_de_cadastro: formatDate(getResult.rows[0].data_de_cadastro),
          };
          res.status(200).json(formattedResult);
        } else {
          res.status(404).json({ message: 'Cliente não encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
      }
      break;

    case 'PUT':
      try {
        // Desestruture os campos do corpo da requisição.
        const { nome, email, cpf } = body;

        // Certifique-se de que todos os campos necessários foram fornecidos.
        if (!nome || !email || !cpf) {
          res.status(400).json({ error: 'Parâmetros insuficientes fornecidos.' });
          return;
        }

        // Execute a consulta para atualizar o cliente.
        const updateResult = await pool.query(
          'UPDATE clientes SET nome = $1, email = $2, cpf = $3 WHERE id = $4 RETURNING *',
          [nome, email, cpf, id] // Os valores devem corresponder à ordem dos $ placeholders.
        );

        // Verifique se a consulta foi bem-sucedida
        if (updateResult.rowCount && updateResult.rowCount > 0) {
          // Formate o resultado para devolver ao cliente
          const updatedCliente = updateResult.rows[0];
          res.status(200).json({
            ...updatedCliente,
          });
        } else {
          res.status(404).json({ message: 'Cliente não encontrado para atualizar.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor.' });
        console.error('Erro ao atualizar cliente:', error);
      }
      break;

    case 'DELETE':
      try {
        const deleteResult = await pool.query(
          'DELETE FROM clientes WHERE id = $1',
          [id]
        );

        // Usando o operador de encadeamento opcional e o operador de coalescência nula
        const rowCount = deleteResult?.rowCount ?? 0;

        if (rowCount > 0) {
          res.status(200).json({ message: 'Cliente excluído com sucesso.' });
        } else {
          res.status(404).json({ message: 'Cliente não encontrado para excluir.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir cliente.' });
        console.error('Erro ao excluir cliente:', error);
      }
      break;
    // Adicione os métodos PUT e DELETE aqui, se necessário

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
