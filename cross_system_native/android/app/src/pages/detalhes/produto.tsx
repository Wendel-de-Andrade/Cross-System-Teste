/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './style';

interface ProdutoDetailRouteParams {
    id: number;
}

interface Produto {
    nome: string;
    valor_unitario: string;
    quantidade: number | null;
}

const ProdutoDetailScreen = () => {
    const [produto, setProduto] = useState<Produto>({ nome: '', valor_unitario: '', quantidade: null });
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as ProdutoDetailRouteParams; // Assumindo que o ID do produto está sendo passado como parâmetro

    useEffect(() => {
        fetch(`http://192.168.1.23:3000/api/produtos/${id}`)
            .then((response) => response.json())
            .then((data) => setProduto(data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleSave = () => {
        // Crie um novo objeto com apenas nome, valor_unitario e quantidade
        const updatedProduto = {
            nome: produto.nome,
            valor_unitario: produto.valor_unitario,
            quantidade: produto.quantidade,
        };

        // console.log('Enviando dados para a API:', JSON.stringify(updatedProduto));

        fetch(`http://192.168.1.23:3000/api/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduto),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then(() => {
                // console.log('Resposta da API:', data);
                Alert.alert('Sucesso', 'Produto atualizado com sucesso.');
                navigation.goBack();
            })
            .catch(() => {
                // console.error('Erro ao atualizar produto', error);
                Alert.alert('Erro', 'Não foi possível atualizar o produto.');
            });
    };

    const handleDelete = () => {
        // Mostra um alerta para confirmar a exclusão
        Alert.alert(
            'Confirmação',
            'Você tem certeza que deseja excluir este produto?',
            [
                // Botão para cancelar sem excluir
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                // Botão para confirmar a exclusão
                {
                    text: 'Excluir',
                    onPress: () => deleteProduto(),
                    style: 'destructive',
                },
            ]
        );
    };

    const deleteProduto = () => {
        fetch(`http://192.168.1.23:3000/api/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then(() => {
                Alert.alert('Sucesso', 'Produto excluído com sucesso.');
                navigation.goBack(); // Volta para a tela anterior
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível excluir o produto.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Detalhe do Produto</Text>
            <TextInput
                style={styles.input}
                value={produto.nome}
                onChangeText={(text) => setProduto({ ...produto, nome: text })}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                value={produto.valor_unitario}
                onChangeText={(text) => setProduto({ ...produto, valor_unitario: text })}
                placeholder="Valor"
            />
            <TextInput
                style={styles.input}
                value={produto.quantidade !== null ? produto.quantidade.toString() : ''}
                onChangeText={(text) => setProduto({ ...produto, quantidade: text !== '' ? Number(text) : null })}
                placeholder="Quantidade"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
                <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProdutoDetailScreen;
