/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './style';

interface PedidoDetailRouteParams {
    id: number;
}

interface Pedido {
    produto: string;
    quantidade: number | null;
    valor: string;
}

const PedidoDetailScreen = () => {
    const [pedido, setPedido] = useState<Pedido>({ produto: '', quantidade: null, valor: '' });
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as PedidoDetailRouteParams; // Assumindo que o ID do pedido está sendo passado como parâmetro

    useEffect(() => {
        fetch(`http://192.168.1.23:3000/api/pedidos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPedido({ ...data, quantidade: Number(data.quantidade) });
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleSave = () => {
        // Crie um novo objeto com apenas nome, email e cpf
        const updatedPedido = {
            produto: pedido.produto,
            quantidade: pedido.quantidade,
            valor: pedido.valor,
        };

        // console.log('Enviando dados para a API:', JSON.stringify(updatedPedido));

        fetch(`http://192.168.1.23:3000/api/pedidos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPedido),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then(() => {
                // console.log('Resposta da API:', data);
                Alert.alert('Sucesso', 'Pedido atualizado com sucesso.');
                navigation.goBack();
            })
            .catch(() => {
                // console.error('Erro ao atualizar pedido', error);
                Alert.alert('Erro', 'Não foi possível atualizar o pedido.');
            });
    };

    const handleDelete = () => {
        // Mostra um alerta para confirmar a exclusão
        Alert.alert(
            'Confirmação',
            'Você tem certeza que deseja excluir este pedido?',
            [
                // Botão para cancelar sem excluir
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                // Botão para confirmar a exclusão
                {
                    text: 'Excluir',
                    onPress: () => deletePedido(),
                    style: 'destructive',
                },
            ]
        );
    };

    const deletePedido = () => {
        fetch(`http://192.168.1.23:3000/api/pedidos/${id}`, {
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
                Alert.alert('Sucesso', 'Pedido excluído com sucesso.');
                navigation.goBack(); // Volta para a tela anterior
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível excluir o pedido.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Detalhe do Pedido</Text>
            <TextInput
                style={styles.input}
                value={pedido.produto}
                onChangeText={(text) => setPedido({ ...pedido, produto: text })}
                placeholder="Produto"
            />
            <TextInput
                style={styles.input}
                value={pedido.quantidade !== null ? pedido.quantidade.toString() : ''}
                onChangeText={(text) => setPedido({ ...pedido, quantidade: text !== '' ? Number(text) : null })}
                placeholder="Quantidade"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={pedido.valor}
                onChangeText={(text) => setPedido({ ...pedido, valor: text })}
                placeholder="Valor"
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

export default PedidoDetailScreen;
