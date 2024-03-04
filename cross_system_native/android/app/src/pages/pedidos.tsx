/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './style';

const PedidosScreen = () => {
    interface Pedido {
        id: number;
        produto: string;
        quantidade: string;
        valor: string;
        data_do_pedido: string;
    }
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<any>();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await fetch('http://192.168.1.23:3000/api/pedidos');
            const data = await response.json();
            setPedidos(data);
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

    const handleAddPedido = () => {
        navigation.navigate('PedidoNew');
    };
    const handleNavigateToClientes = () => {
        navigation.navigate('Clientes'); // O nome da rota deve corresponder ao nome definido no seu Stack.Navigator
    };
    // Função para navegar para a tela de Produtos
    const handleNavigateToProdutos = () => {
        navigation.navigate('Produtos'); // O nome da rota deve corresponder ao nome definido no seu Stack.Navigator
    };

    const handleLogin = () => {
        navigation.navigate('Login'); // Certifique-se de que 'Login' corresponda ao nome da rota na sua stack de navegação
    };

    useEffect(() => {
        fetch('http://192.168.1.23:3000/api/pedidos')
            .then((response) => response.json())
            .then(setPedidos)
            .catch((error) => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>SAIR</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Pedidos</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scrollView}>
                {pedidos.map((pedido) => (
                    <TouchableOpacity key={pedido.id} onPress={() => navigation.navigate('PedidoDetail', { id: pedido.id })}>
                        <View key={pedido.id} style={styles.pageContainer}>
                            <Text style={styles.pagePrinc}>Produto: {pedido.produto}</Text>
                            <Text style={styles.pageInfo}>Quantidade: {pedido.quantidade}</Text>
                            <Text style={styles.pageInfo}>Valor: {pedido.valor}</Text>
                            <Text style={styles.pageInfo}>Data do Pedido: {pedido.data_do_pedido}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.fab} onPress={handleAddPedido}>
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.navButton} onPress={handleNavigateToClientes}>
                    <Text style={styles.navButtonText}>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText} onPress={() => navigation.navigate('Pedidos')}>Pedidos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleNavigateToProdutos}>
                    <Text style={styles.navButtonText}>Produtos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PedidosScreen;
