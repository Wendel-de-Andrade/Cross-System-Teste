/* eslint-disable prettier/prettier */
// ClientesScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    scrollView: {
        flex: 0,
    },
    pageContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
        elevation: 5,
    },
    pagePrinc: {
        fontWeight: 'bold',
        fontSize: 18, // Tamanho maior para o nome
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        backgroundColor: 'white',
    },
    navButton: {
        paddingVertical: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Adicionando estilos para os outros textos dos clientes
    pageInfo: {
        fontSize: 14, // Um tamanho adequado para informações gerais
        color: '#333333', // Cor mais escura para melhor leitura
        marginBottom: 5, // Espaço entre as linhas de texto
    },
    fab: {
        position: 'absolute', // Isso posicionará o botão sobre os outros elementos da tela
        width: 56, // Tamanho do botão
        height: 56, // Tamanho do botão
        alignItems: 'center', // Centraliza o ícone '+' horizontalmente
        justifyContent: 'center', // Centraliza o ícone '+' verticalmente
        right: 20, // Distância do botão à direita da tela
        bottom: 20, // Distância do botão ao fundo da tela
        backgroundColor: '#007bff', // Cor de fundo azul
        borderRadius: 28, // Metade da largura/altura para torná-lo circular
        elevation: 8, // Sombra no Android
        shadowColor: '#007bff', // Cor da sombra
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowOffset: { width: 1, height: 1 }, // Posição da sombra
        shadowRadius: 5, // Alcance da sombra
    },
    fabIcon: {
        fontSize: 24, // Tamanho do ícone '+'
        color: 'white', // Cor do ícone
        marginBottom: 3, // Ajuste para o alinhamento visual do ícone '+'
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Isso é necessário para posicionar o botão de login absolutamente
        // ... (qualquer outro estilo necessário para o cabeçalho)
    },
    loginButton: {
        backgroundColor: '#db3939', // Isso vai fazer o botão ser vermelho
        padding: 10,
        borderRadius: 10,
        width: 55,
        position: 'absolute', // Posiciona sobre o container
        left: 15, // A distância do lado esquerdo do container
        top: '50%', // Posiciona na metade da altura do container
        transform: [{ translateY: -17 }], // Desloca metade da altura do botão para cima
        // ... (qualquer outro estilo necessário para o botão)
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        // ... (qualquer outro estilo necessário para o texto dentro do botão)
    },

});
