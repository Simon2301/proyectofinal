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

export default Inicio;
