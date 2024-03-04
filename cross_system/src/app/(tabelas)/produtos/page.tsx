'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../../components/tables/table';
import Layout from '../../../components/navbar/layout';
import styles from '../tabela.module.css';

// Definir uma interface para o tipo Produtos
interface Produtos {
    id: number;
    nome: string;
    valor_unitario: string;
    quantidade: string;
}

const produtosPage = () => {
    const [produtos, setprodutos] = useState<Array<{ id: number, values: string[] }>>([]);

    const fetchprodutos = useCallback(() => {
        fetch('/api/produtos')
            .then(response => response.json())
            .then((data: Produtos[]) => {
                const formattedData = data.map(Produtos => ({
                    id: Produtos.id,
                    values: [Produtos.nome, Produtos.valor_unitario, Produtos.quantidade]
                }));
                setprodutos(formattedData);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    useEffect(() => {
        fetchprodutos();
    }, [fetchprodutos]);

    // Função para redirecionar para a página de novo Produtos
    const handleNewClient = () => {
        window.location.assign('/produtos/novo'); // Redireciona para a rota /Produtos/novo
    };

    // Função para recarregar os produtos
    const handleListClients = () => {
        fetchprodutos(); // Recarrega os produtos
    };

    const columns = ['Nome', 'Valor Unitário', 'Quantidade', ''];

    return (
        <Layout>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Produtos</h1>
                <div className={styles.buttons_container}>
                    <button onClick={handleNewClient} className={styles.listButton}>Novo</button>
                    <button onClick={handleListClients} className={styles.listButton}>Listar</button>
                </div>
            </div>
            <Table columns={columns} data={produtos} baseRoute="/produtos" />
        </Layout>
    );
};

export default produtosPage;
