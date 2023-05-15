import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import telaLogin from './screens/login'
import disponibilidade from './screens/disponibilidade';
import manutencao from './screens/manutencao';
import operacao from './screens/operacao';

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function TelaAll() {
  return(
    <Tab.Navigator
            initialRouteName="Disponibilidade"
            activeColor="black"
            labelStyle={{ fontSize: 12, color: "white" }}
            barStyle={{ backgroundColor: '#fff'}}
        >
            <Tab.Screen
                name="Disponibilidade"
                component={disponibilidade}
                options={{
                    tabBarLabel: 'Disponibilidade',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="event-available" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Manutencao"
                component={manutencao}
                options={{
                    tabBarLabel: "Manutenções",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="tools" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Operacao"
                component={operacao}
                options={{
                    tabBarLabel: "Operações",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="truck-fast" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={telaLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="Post" component={TelaAll} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}