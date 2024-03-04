/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

const ClienteNew = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    const navigation = useNavigation();

    const handleCreate = () => {
        const clienteData = {
            nome: nome,
            email: email,
            cpf: cpf.replace(/\D/g, ''), // Remove caracteres não numéricos do CPF
        };

        fetch('http://192.168.1.23:3000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao criar cliente');
            }
            return response.json();
        })
        .then(() => {
            Alert.alert('Sucesso', 'Cliente criado com sucesso.');
            navigation.goBack(); // Retorna à tela anterior
        })
        .catch((error) => {
            console.error('Erro ao criar cliente', error);
            Alert.alert('Erro', 'Não foi possível criar o cliente.');
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Criar Cliente</Text>
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
            />
            <TextInput
                style={styles.input}
                onChangeText={setCpf}
                value={cpf}
                placeholder="CPF"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ClienteNew;
