/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation<any>();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.23:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, senha: senha }),
            });

            if (response.ok) {
                navigation.navigate('Clientes');
            } else {
                // Tratamento de erros específicos com base no status da resposta
                if (response.status === 401) {
                    Alert.alert('Erro', 'Credenciais inválidas!');
                } else if (response.status === 404) {
                    Alert.alert('Erro', 'Usuário não encontrado!');
                } else {
                    Alert.alert('Erro', 'Erro ao fazer login!');
                }
            }
        } catch (error) {
            // Tratar erros de conexão aqui
            console.error('Erro ao tentar se conectar ao servidor:', error);
            Alert.alert('Erro', 'Erro ao tentar se conectar ao servidor.');
        }
    };

    const handleSignUp = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Image style={styles.logo} source={{ uri: 'https://encurtador.com.br/aDF19' }} />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setSenha}
                value={senha}
                placeholder="Senha"
                secureTextEntry
            />
            <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
