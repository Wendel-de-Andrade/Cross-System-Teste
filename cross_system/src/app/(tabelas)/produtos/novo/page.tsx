'use client'

import React, { useState, useRef } from 'react';
import Layout from '../../../../components/navbar/layout';
import styles from '../../new.module.css';

const NovoProdutoPage = () => {
    const [nome, setNome] = useState('');
    const [valor_unitario, setValorUnitario] = useState('');
    const [quantidade, setQtd] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            const response = await fetch('/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, valor_unitario, quantidade }),
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            // Limpa o formulário após a inserção bem-sucedida
            setNome('');
            setValorUnitario('');
            setQtd('');

            // Exibe uma mensagem de sucesso ou redireciona o usuário
            alert('Produto criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar produto:', error);
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
                <h1 className={styles.headerTitle}>Novo Produto</h1>
                <div className={styles.buttons_container}>
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
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="valor_unitario">Valor Unitário:</label>
                        <input
                            type="text"
                            id="valor_unitario"
                            name="valor_unitario"
                            value={valor_unitario}
                            onChange={(e) => setValorUnitario(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input
                            type="text"
                            id="quantidade"
                            name="quantidade"
                            value={quantidade}
                            onChange={(e) => setQtd(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default NovoProdutoPage;
