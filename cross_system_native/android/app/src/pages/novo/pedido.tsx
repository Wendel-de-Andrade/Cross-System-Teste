/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

const PedidoNew = () => {
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const navigation = useNavigation();

    const handleCreate = () => {
        const pedidoData = {
            produto: produto,
            quantidade: quantidade,
            valor: valor.replace(/\D/g, ''), // Remove caracteres não numéricos do CPF
        };

        fetch('http://192.168.1.23:3000/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao criar pedido');
            }
            return response.json();
        })
        .then(() => {
            Alert.alert('Sucesso', 'Pedido criado com sucesso.');
            navigation.goBack(); // Retorna à tela anterior
        })
        .catch((error) => {
            console.error('Erro ao criar pedido', error);
            Alert.alert('Erro', 'Não foi possível criar o pedido.');
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Criar Pedido</Text>
            <TextInput
                style={styles.input}
                onChangeText={setProduto}
                value={produto}
                placeholder="Produto"
            />
            <TextInput
                style={styles.input}
                onChangeText={setQuantidade}
                value={quantidade}
                placeholder="Quantidade"
            />
            <TextInput
                style={styles.input}
                onChangeText={setValor}
                value={valor}
                placeholder="Valor"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PedidoNew;
