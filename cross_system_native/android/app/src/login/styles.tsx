/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    alignSelf: 'stretch', // Isso faz com que o texto "Login" se estenda por toda a largura do container
    textAlign: 'center', // Isso centraliza o texto no header
    fontSize: 24, // Exemplo de tamanho de fonte, ajuste conforme necessário
    marginBottom: 100,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    alignSelf: 'center',
    marginBottom: 48,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
