/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './style';

const ProdutosScreen = () => {
    type Produto = {
        id: number;
        nome: string;
        valor_unitario: string;
        quantidade: string;
    };
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<any>();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await fetch('http://192.168.1.23:3000/api/produtos');
            const data = await response.json();
            setProdutos(data);
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

    const handleAddProduto = () => {
        navigation.navigate('ProdutoNew');
    };
    const handleNavigateToClientes = () => {
        navigation.navigate('Clientes'); // O nome da rota deve corresponder ao nome definido no seu Stack.Navigator
    };
    // Função para navegar para a tela de Produtos
    const handleNavigateToPedidos = () => {
        navigation.navigate('Pedidos'); // O nome da rota deve corresponder ao nome definido no seu Stack.Navigator
    };

    const handleLogin = () => {
        navigation.navigate('Login'); // Certifique-se de que 'Login' corresponda ao nome da rota na sua stack de navegação
    };

    useEffect(() => {
        fetch('http://192.168.1.23:3000/api/produtos')
            .then((response) => response.json())
            .then(setProdutos)
            .catch((error) => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>SAIR</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Produtos</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scrollView}>
                {produtos.map((produto) => (
                    <TouchableOpacity key={produto.id} onPress={() => navigation.navigate('ProdutoDetail', { id: produto.id })}>
                        <View key={produto.id} style={styles.pageContainer}>
                            <Text style={styles.pagePrinc}>Produto: {produto.nome}</Text>
                            <Text style={styles.pageInfo}>Valor Unitário: {produto.valor_unitario}</Text>
                            <Text style={styles.pageInfo}>Quantidade: {produto.quantidade}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.fab} onPress={handleAddProduto}>
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText} onPress={handleNavigateToClientes}>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText} onPress={handleNavigateToPedidos}>Pedidos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText} onPress={() => navigation.navigate('Produtos')}>Produtos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProdutosScreen;
