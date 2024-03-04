'use client'

import React, { useState, useRef } from 'react';
import Layout from '../../../../components/navbar/layout';
import styles from '../../new.module.css';

const NovoClientePage = () => {
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            const response = await fetch('/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ produto, quantidade, valor }),
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            // Limpa o formulário após a inserção bem-sucedida
            setProduto('');
            setQuantidade('');
            setValor('');

            // Exibe uma mensagem de sucesso ou redireciona o usuário
            alert('Pedido criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
        }
    };

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    return (
        <Layout>
            <div className={styles.header}>
                <h1>Novo Pedido</h1>
                <div className={styles.buttons_container}>
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
                            value={produto}
                            onChange={(e) => setProduto(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input
                            type="text"
                            id="quantidade"
                            name="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="valor">Valor:</label>
                        <input
                            type="text"
                            id="valor"
                            name="valor"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default NovoClientePage;
