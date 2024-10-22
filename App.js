import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ListaScreen from './src/screens/ListaScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen'; // Importar la pantalla de resultados de búsqueda
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Definir el Stack Navigator para manejar las pantallas de perfil
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
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
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="RegistroScreen"
          component={RegistroScreen}
        />
        <Stack.Screen
          name="Inicio"
          component={Inicio}
        />
        {/* Pantallas adicionales en caso de navegación directa */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
        />
        <Stack.Screen
          name="ListaScreen"
          component={ListaScreen}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
        />
         <Stack.Screen
          name="SearchResultsScreen" 
          component={SearchResultsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
