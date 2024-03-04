'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../../components/tables/table';
import Layout from '../../../components/navbar/layout';
import styles from '../tabela.module.css';

// Definir uma interface para o tipo Cliente
interface Cliente {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    data_de_cadastro: string;
}

const ClientesPage = () => {
    const [clientes, setClientes] = useState<Array<{ id: number, values: string[] }>>([]);

    const fetchClientes = useCallback(() => {
        fetch('/api/clientes')
            .then(response => response.json())
            .then((data: Cliente[]) => {
                const formattedData = data.map(cliente => ({
                    id: cliente.id,
                    values: [cliente.nome, cliente.email, cliente.cpf, cliente.data_de_cadastro]
                }));
                setClientes(formattedData);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    // Função para redirecionar para a página de novo cliente
    const handleNewClient = () => {
        window.location.assign('/clientes/novo'); // Redireciona para a rota /cliente/novo
    };

    // Função para recarregar os clientes
    const handleListClients = () => {
        fetchClientes(); // Recarrega os clientes
    };

    const columns = ['Nome', 'Email', 'CPF', 'Data de Cadastro', ''];

    return (
        <Layout>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Clientes</h1>
                <div className={styles.buttons_container}>
                    <button onClick={handleNewClient} className={styles.listButton}>Novo</button>
                    <button onClick={handleListClients} className={styles.listButton}>Listar</button>
                </div>
            </div>
            <Table columns={columns} data={clientes} baseRoute="/clientes" />
        </Layout>
    );
};

export default ClientesPage;
