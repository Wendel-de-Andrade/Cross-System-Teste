/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './android/app/src/login/Login';
import Register from './android/app/src/login/Register';
import Clientes from './android/app/src/pages/clientes';
import Pedidos from './android/app/src/pages/pedidos';
import Produtos from './android/app/src/pages/produtos';

import ClienteDetail from './android/app/src/pages/detalhes/cliente';
import PedidoDetail from './android/app/src/pages/detalhes/pedido';
import ProdutoDetail from './android/app/src/pages/detalhes/produto';

import ClienteNew from './android/app/src/pages/novo/cliente';
import PedidoNew from './android/app/src/pages/novo/pedido';
import ProdutoNew from './android/app/src/pages/novo/produto';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Clientes"
          component={Clientes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pedidos"
          component={Pedidos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Produtos"
          component={Produtos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClienteDetail"
          component={ClienteDetail}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PedidoDetail"
          component={PedidoDetail}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ProdutoDetail"
          component={ProdutoDetail}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ClienteNew"
          component={ClienteNew}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PedidoNew"
          component={PedidoNew}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ProdutoNew"
          component={ProdutoNew}
          options={{
            headerShown: true,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
