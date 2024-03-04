'use client'

// import { useRouter } from 'next/navigation';
import React, { useEffect, useState, FormEvent, useRef } from 'react';
import Layout from '../../../../components/navbar/layout';
import styles from '../../edit.module.css';

// Defina um tipo para os dados do pedido
type Pedido = {
    id: number;
    produto: string;
    quantidade: string;
    valor: string;
    data_do_pedido: string;
};

const PedidoDetailPage = () => {
    const [pedido, setPedido] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState(true);
    const [pedidoEncontrado, setPedidoEncontrado] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSaveClick = () => {
        // Se a referência do formulário é válida, dispare o evento submit
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    useEffect(() => {
        // Obter o ID do pedido da URL
        const pedidoId = new URL(window.location.href).pathname.split('/').pop();

        const fetchPedido = async () => {
            if (pedidoId) {
                try {
                    const response = await fetch(`/api/pedidos/${pedidoId}`);
                    if (!response.ok && response.status === 404 || response.status === 500) {
                        setPedidoEncontrado(false);
                        setLoading(false);
                        return;
                    }
                    const data = await response.json();
                    setPedido(data);
                } catch (error) {
                    console.error('Erro ao buscar dados do pedido:', error);
                }
            }
            setLoading(false);
        };

        fetchPedido();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (pedido) {
            // Criando um novo objeto com apenas os campos necessários para a atualização
            const pedidoParaAtualizar = {
                id: pedido.id,
                produto: pedido.produto,
                quantidade: pedido.quantidade,
                valor: pedido.valor
            };

            try {
                const response = await fetch(`/api/pedidos/${pedido.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pedidoParaAtualizar),
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }

                const updatedPedido = await response.json();
                setPedido(updatedPedido); // Atualiza o estado com o pedido atualizado
                alert('Pedido atualizado com sucesso!');
            } catch (error) {
                console.error('Erro ao atualizar pedido:', error);
                alert('Erro ao atualizar pedido.');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPedido(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleDelete = async () => {
        if (pedido && confirm('Tem certeza que deseja excluir este pedido?')) {
            try {
                const response = await fetch(`/api/pedidos/${pedido.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }

                // Após a exclusão, você pode redirecionar para a lista de pedidos ou mostrar uma mensagem
                alert('Pedido excluído com sucesso!');
                // Redireciona para a página de lista de pedidos
                window.location.assign('/pedidos');
            } catch (error) {
                console.error('Erro ao excluir pedido:', error);
                alert('Erro ao excluir pedido.');
            }
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!pedidoEncontrado) {
        return (
            <Layout>
                <p>Pedido não encontrado.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Detalhe do Pedido</h1>
                <div className={styles.buttons_container}>
                    <button type="button" onClick={handleDelete} className={`${styles.listButton} ${styles.removeButton}`}>Excluir</button>
                    <button type="button" onClick={handleSaveClick} className={styles.listButton}>Salvar</button>
                </div>
            </div>
            <div className={styles.forms}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label htmlFor="produto">Produto:</label>
                        <input
                            type="text"
                            id="produto"
                            name="produto"
                            value={pedido?.produto || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input
                            type="text"
                            id="quantidade"
                            name="quantidade"
                            value={pedido?.quantidade || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="valor">Valor:</label>
                        <input
                            type="text"
                            id="valor"
                            name="valor"
                            value={pedido?.valor || ''}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default PedidoDetailPage;
