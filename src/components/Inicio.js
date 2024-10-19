import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ListaScreen from '../screens/ListaScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Definir el Stack Navigator para manejar las pantallas de perfil
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen" // Cambié el nombre a "ProfileScreen" para evitar conflicto
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: 'Editar Perfil' }}
      />
    </Stack.Navigator>
  );
};

// Definir el Tab Navigator que incluye el Stack de perfil
const Inicio = () => {
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#f5e1ce"
      barStyle={{ backgroundColor: '#A67B58' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="star" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Lista"
        component={ListaScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack} // Usamos el Stack Navigator de perfil aquí
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

//Chat API: https://chatgpt.com/share/671300c9-1204-800a-840c-7f41e9f1958a
const axios = require('axios');

// Clave API obtenida de spoonacular
const apiKey = '6e0ad0cae8e14e5f935bd3991235608d';

// Realizar una solicitud para buscar recetas por ingredientes
const buscarRecetasPorIngredientes = async (ingredientes) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: ingredientes,
        apiKey: apiKey,
        number: 5  // Número de recetas que quieres obtener
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error al buscar recetas:', error);
  }
};

// Uso del ejemplo: buscando recetas con tomate y queso
buscarRecetasPorIngredientes('tomato,cheese');

export default Inicio;