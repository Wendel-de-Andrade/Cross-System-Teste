/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './style';

interface ClienteDetailRouteParams {
    id: number;
}

const ClienteDetailScreen = () => {
    const [cliente, setCliente] = useState({ nome: '', email: '', cpf: '' });
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as ClienteDetailRouteParams; // Assumindo que o ID do cliente está sendo passado como parâmetro

    useEffect(() => {
        fetch(`http://192.168.1.23:3000/api/clientes/${id}`)
            .then((response) => response.json())
            .then((data) => setCliente(data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleSave = () => {
        // Crie um novo objeto com apenas nome, email e cpf
        const updatedCliente = {
            nome: cliente.nome,
            email: cliente.email,
            cpf: cliente.cpf.replace(/\D/g, ''),
        };

        // console.log('Enviando dados para a API:', JSON.stringify(updatedCliente));

        fetch(`http://192.168.1.23:3000/api/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCliente),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then(() => {
                // console.log('Resposta da API:', data);
                Alert.alert('Sucesso', 'Cliente atualizado com sucesso.');
                navigation.goBack();
            })
            .catch(() => {
                // console.error('Erro ao atualizar cliente', error);
                Alert.alert('Erro', 'Não foi possível atualizar o cliente.');
            });
    };

    const handleDelete = () => {
        // Mostra um alerta para confirmar a exclusão
        Alert.alert(
            'Confirmação',
            'Você tem certeza que deseja excluir este cliente?',
            [
                // Botão para cancelar sem excluir
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                // Botão para confirmar a exclusão
                {
                    text: 'Excluir',
                    onPress: () => deleteCliente(),
                    style: 'destructive',
                },
            ]
        );
    };

    const deleteCliente = () => {
        fetch(`http://192.168.1.23:3000/api/clientes/${id}`, {
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
                Alert.alert('Sucesso', 'Cliente excluído com sucesso.');
                navigation.goBack(); // Volta para a tela anterior
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível excluir o cliente.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Detalhe do Cliente</Text>
            <TextInput
                style={styles.input}
                value={cliente.nome}
                onChangeText={(text) => setCliente({ ...cliente, nome: text })}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                value={cliente.email}
                onChangeText={(text) => setCliente({ ...cliente, email: text })}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                value={cliente.cpf}
                onChangeText={(text) => setCliente({ ...cliente, cpf: text })}
                placeholder="CPF"
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

export default ClienteDetailScreen;
