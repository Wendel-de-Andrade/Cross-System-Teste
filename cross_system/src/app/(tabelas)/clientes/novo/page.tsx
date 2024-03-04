'use client'

import React, { useState, useRef } from 'react';
import Layout from '../../../../components/navbar/layout';
import styles from '../../new.module.css';

const NovoClientePage = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, cpf }),
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            // Limpa o formulário após a inserção bem-sucedida
            setNome('');
            setEmail('');
            setCpf('');

            // Exibe uma mensagem de sucesso ou redireciona o usuário
            alert('Cliente criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
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
                <h1>Novo Cliente</h1>
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default NovoClientePage;
