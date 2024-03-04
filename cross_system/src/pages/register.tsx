import React, { useState } from 'react';
import styles from '../app/page.module.css';
import { useRouter } from 'next/router';
import Layout from '../components/navbar/layout';

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função para lidar com o registro do usuário
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: name, email, senha: password }),
            });

            if (response.ok) {
                // Se o cadastro for bem-sucedido, redirecionar para a página inicial
                router.push('/');
            } else {
                // Tratar os erros de resposta aqui
                console.error('Falha no cadastro:', await response.json());
            }
        } catch (error) {
            // Tratar erros de conexão aqui
            console.error('Erro ao tentar se conectar ao servidor:', error);
        }
    };

    // Função para navegar de volta à tela de login
    const navigateToLogin = () => {
        router.push('/login');
    };

    return (
        <Layout showLinks={false}>
            <div className={styles.loginContainer}>
                <div className={styles.logoSection}>
                    <img src="https://encurtador.com.br/aDF19" alt="Logo" className={styles.logo} />
                </div>
                <div className={styles.formSection}>

                    <h2>CADASTRO</h2>

                    <form onSubmit={handleRegister} className={styles.form}>
                        <p>Nome</p>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <p>Email</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <p>Senha</p>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className={styles.actions}>
                            <button type="button" onClick={navigateToLogin}>
                                Voltar
                            </button>
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
