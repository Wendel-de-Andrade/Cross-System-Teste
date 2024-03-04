'use client'

// import { useRouter } from 'next/navigation';
import React, { useEffect, useState, FormEvent, useRef } from 'react';
import Layout from '../../../../components/navbar/layout';
import styles from '../../edit.module.css';

// Defina um tipo para os dados do cliente
type Cliente = {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    data_de_cadastro: string;
};

const ClienteDetailPage = () => {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);
    const [clienteEncontrado, setClienteEncontrado] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSaveClick = () => {
        // Se a referência do formulário é válida, dispare o evento submit
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    useEffect(() => {
        // Obter o ID do cliente da URL
        const clienteId = new URL(window.location.href).pathname.split('/').pop();

        const fetchCliente = async () => {
            if (clienteId) {
                try {
                    const response = await fetch(`/api/clientes/${clienteId}`);
                    if (!response.ok && response.status === 404 || response.status === 500) {
                        setClienteEncontrado(false);
                        setLoading(false);
                        return;
                    }
                    const data = await response.json();
                    setCliente(data);
                } catch (error) {
                    console.error('Erro ao buscar dados do cliente:', error);
                }
            }
            setLoading(false);
        };

        fetchCliente();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (cliente) {
            // Criando um novo objeto com apenas os campos necessários para a atualização
            const clienteParaAtualizar = {
                id: cliente.id, // Presume-se que o ID é necessário para identificar o cliente na API
                nome: cliente.nome,
                email: cliente.email,
                cpf: cliente.cpf.replace(/\D/g, ''), // Remove tudo que não é dígito
            };

            try {
                const response = await fetch(`/api/clientes/${cliente.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(clienteParaAtualizar),
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }

                const updatedCliente = await response.json();
                setCliente(updatedCliente); // Atualiza o estado com o cliente atualizado
                alert('Cliente atualizado com sucesso!');
            } catch (error) {
                console.error('Erro ao atualizar cliente:', error);
                alert('Erro ao atualizar cliente.');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleDelete = async () => {
        if (cliente && confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                const response = await fetch(`/api/clientes/${cliente.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }

                // Após a exclusão, você pode redirecionar para a lista de clientes ou mostrar uma mensagem
                alert('Cliente excluído com sucesso!');
                // Redireciona para a página de lista de clientes
                window.location.assign('/clientes');
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
                alert('Erro ao excluir cliente.');
            }
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!clienteEncontrado) {
        return (
            <Layout>
                <p>Cliente não encontrado.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Detalhe do Cliente</h1>
                <div className={styles.buttons_container}>
                    <button type="button" onClick={handleDelete} className={`${styles.listButton} ${styles.removeButton}`}>Excluir</button>
                    <button type="button" onClick={handleSaveClick} className={styles.listButton}>Salvar</button>
                </div>
            </div>
            <div className={styles.forms}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={cliente?.nome || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={cliente?.email || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={cliente?.cpf || ''}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ClienteDetailPage;
