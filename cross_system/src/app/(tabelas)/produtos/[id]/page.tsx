'use client'

// import { useRouter } from 'next/navigation';
import React, { useEffect, useState, FormEvent, useRef } from 'react';
import Layout from '../../../../components/navbar/layout';
import styles from '../../edit.module.css';

// Defina um tipo para os dados do produto
type Produto = {
    id: number;
    nome: string;
    valor_unitario: string;
    quantidade: string;
};

const ProdutoDetailPage = () => {
    const [produto, setProduto] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);
    const [produtoEncontrado, setProdutoEncontrado] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSaveClick = () => {
        // Se a referência do formulário é válida, dispare o evento submit
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    useEffect(() => {
        // Obter o ID do produto da URL
        const produtoId = new URL(window.location.href).pathname.split('/').pop();

        const fetchProduto = async () => {
            if (produtoId) {
                try {
                    const response = await fetch(`/api/produtos/${produtoId}`);
                    if (!response.ok && response.status === 404 || response.status === 500) {
                        setProdutoEncontrado(false);
                        setLoading(false);
                        return;
                    }
                    const data = await response.json();
                    setProduto(data);
                } catch (error) {
                    console.error('Erro ao buscar dados do produto:', error);
                }
            }
            setLoading(false);
        };

        fetchProduto();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (produto) {
            // Criando um novo objeto com apenas os campos necessários para a atualização
            const produtoParaAtualizar = {
                id: produto.id,
                nome: produto.nome,
                valor_unitario: produto.valor_unitario,
                quantidade: produto.quantidade
            };

            try {
                const response = await fetch(`/api/produtos/${produto.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(produtoParaAtualizar),
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }

                const updatedProduto = await response.json();
                setProduto(updatedProduto); // Atualiza o estado com o produto atualizado
                alert('Produto atualizado com sucesso!');
            } catch (error) {
                console.error('Erro ao atualizar produto:', error);
                alert('Erro ao atualizar produto.');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduto(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleDelete = async () => {
        if (produto && confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                const response = await fetch(`/api/produtos/${produto.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }

                // Após a exclusão, você pode redirecionar para a lista de produtos ou mostrar uma mensagem
                alert('Produto excluído com sucesso!');
                // Redireciona para a página de lista de produtos
                window.location.assign('/produtos');
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto.');
            }
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!produtoEncontrado) {
        return (
            <Layout>
                <p>Produto não encontrado.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Detalhe do Produto</h1>
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
                            value={produto?.nome || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="valor_unitario">Valor Unitário:</label>
                        <input
                            type="text"
                            id="valor_unitario"
                            name="valor_unitario"
                            value={produto?.valor_unitario || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input
                            type="text"
                            id="quantidade"
                            name="quantidade"
                            value={produto?.quantidade || ''}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ProdutoDetailPage;
