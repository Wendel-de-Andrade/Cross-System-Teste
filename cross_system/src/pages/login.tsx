import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../app/page.module.css';
import Layout from '../components/navbar/layout';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha: password }),
            });

            if (response.ok) {
                // Se o login for bem-sucedido, redirecionar para a página de pedidos
                router.push('/pedidos');
            } else {
                // Tratamento de erros específicos com base no status da resposta
                if (response.status === 401) {
                    alert('Credenciais inválidas!');
                } else if (response.status === 404) {
                    alert('Usuário não encontrado!');
                } else {
                    console.error('Erro no login:', await response.json());
                }
            }
        } catch (error) {
            // Tratar erros de conexão aqui
            console.error('Erro ao tentar se conectar ao servidor:', error);
        }
    };

    const navigateToRegister = () => {
        router.push('/register');
    };

    return (
        <Layout showLinks={false}>
            <div className={styles.loginContainer}>
                <div className={styles.logoSection}>
                    <img src="https://encurtador.com.br/aDF19" alt="Logo" className={styles.logo} />
                </div>
                <div className={styles.formSection}>

                    <h2>LOGIN</h2>

                    <form onSubmit={handleLogin} className={styles.form}>
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
                            <button type="button" onClick={navigateToRegister}>
                                Cadastrar
                            </button>
                            <button type="submit">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
