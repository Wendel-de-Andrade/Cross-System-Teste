/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const RegisterScreen = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation<any>();

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.1.23:3000/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nome, email: email, senha: senha }),
            });

            if (response.ok) {
                navigation.navigate('Login');
            } else {
                // Tratamento de erros específicos com base no status da resposta
                if (response.status === 400) {
                    Alert.alert('Erro', 'Dados inválidos. Verifique o preenchimento.');
                } else {
                    Alert.alert('Erro', 'Erro no cadastro.');
                }
            }
        } catch (error) {
            // Tratar erros de conexão aqui
            console.error('Erro ao tentar se conectar ao servidor:', error);
            Alert.alert('Erro', 'Erro ao tentar se conectar ao servidor.');
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cadastrar</Text>
            <Image style={styles.logo} source={{ uri: 'https://encurtador.com.br/aDF19' }} />
            <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder="Nome"
            />
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
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterScreen;
