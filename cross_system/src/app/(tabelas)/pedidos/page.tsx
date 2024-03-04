'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../../components/tables/table';
import Layout from '../../../components/navbar/layout';
import styles from '../tabela.module.css';

// Definir uma interface para o tipo Cliente
interface Pedido {
    id: number;
    produto: string;
    quantidade: string;
    valor: string;
    data_do_pedido: string;
}

const ClientesPage = () => {
    const [pedidos, setPedido] = useState<Array<{ id: number, values: string[] }>>([]);

    const fetchPedidos = useCallback(() => {
        fetch('/api/pedidos')
            .then(response => response.json())
            .then((data: Pedido[]) => {
                const formattedData = data.map(pedido => ({
                    id: pedido.id,
                    values: [pedido.produto, pedido.quantidade, pedido.valor, pedido.data_do_pedido]
                }));
                setPedido(formattedData);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    useEffect(() => {
        fetchPedidos();
    }, [fetchPedidos]);

    // Função para redirecionar para a página de novo cliente
    const handleNewClient = () => {
        window.location.assign('/pedidos/novo'); // Redireciona para a rota /cliente/novo
    };

    // Função para recarregar os clientes
    const handleListClients = () => {
        fetchPedidos(); // Recarrega os clientes
    };

    const columns = ['Produto', 'Quantidade', 'Valor', 'Data do Pedido', ''];

    return (
        <Layout>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Pedidos</h1>
                <div className={styles.buttons_container}>
                    <button onClick={handleNewClient} className={styles.listButton}>Novo</button>
                    <button onClick={handleListClients} className={styles.listButton}>Listar</button>
                </div>
            </div>
            <Table columns={columns} data={pedidos} baseRoute="/pedidos" />
        </Layout>
    );
};

export default ClientesPage;
