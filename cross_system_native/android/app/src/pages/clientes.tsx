/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './style';

const ClientesScreen = () => {
    interface Cliente {
        id: number;
        nome: string;
        email: string;
        cpf: string;
        data_de_cadastro: string;
    }
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<any>();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await fetch('http://192.168.1.23:3000/api/clientes');
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error(error);
        }
        setRefreshing(false);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            onRefresh();
        }, [onRefresh])
    );

    const handleAddCliente = () => {
        navigation.navigate('ClienteNew');
    };

    const handleNavigateToPedidos = () => {
        navigation.navigate('Pedidos'); // O nome da rota deve corresponder ao nome definido no seu Stack.Navigator
    };

    // Função para navegar para a tela de Produtos
    const handleNavigateToProdutos = () => {
        navigation.navigate('Produtos'); // O nome da rota deve corresponder ao nome definido no seu Stack.Navigator
    };

    const handleLogin = () => {
        navigation.navigate('Login'); // Certifique-se de que 'Login' corresponda ao nome da rota na sua stack de navegação
    };

    useEffect(() => {
        fetch('http://192.168.1.23:3000/api/clientes')
            .then((response) => response.json())
            .then(setClientes)
            .catch((error) => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>SAIR</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Clientes</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scrollView}>
                {clientes.map((cliente) => (
                    <TouchableOpacity key={cliente.id} onPress={() => navigation.navigate('ClienteDetail', { id: cliente.id })}>
                        <View style={styles.pageContainer}>
                            <Text style={styles.pagePrinc}>Nome: {cliente.nome}</Text>
                            <Text style={styles.pageInfo}>Email: {cliente.email}</Text>
                            <Text style={styles.pageInfo}>CPF: {cliente.cpf}</Text>
                            <Text style={styles.pageInfo}>Data de Cadastro: {cliente.data_de_cadastro}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.fab} onPress={handleAddCliente}>
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText} onPress={() => navigation.navigate('Clientes')}>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNavigateToPedidos}>
                    <Text style={styles.navButtonText}>Pedidos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNavigateToProdutos}>
                    <Text style={styles.navButtonText}>Produtos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ClientesScreen;
