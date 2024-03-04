/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

const ProdutoNew = () => {
    const [nome, setNome] = useState('');
    const [valor_unitario, setValor_unit] = useState('');
    const [quantidade, setQtd] = useState('');

    const navigation = useNavigation();

    const handleCreate = () => {
        const produtoData = {
            nome: nome,
            valor_unitario: valor_unitario,
            quantidade: quantidade,
        };

        fetch('http://192.168.1.23:3000/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produtoData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao criar produto');
            }
            return response.json();
        })
        .then(() => {
            Alert.alert('Sucesso', 'Produto criado com sucesso.');
            navigation.goBack(); // Retorna à tela anterior
        })
        .catch((error) => {
            console.error('Erro ao criar produto', error);
            Alert.alert('Erro', 'Não foi possível criar o produto.');
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Criar Produto</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                onChangeText={setValor_unit}
                value={valor_unitario}
                placeholder="Valor"
            />
            <TextInput
                style={styles.input}
                onChangeText={setQtd}
                value={quantidade}
                placeholder="Quantidade"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProdutoNew;
