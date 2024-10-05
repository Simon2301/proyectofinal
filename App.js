import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Formulario from "./src/components/Formulario";
import BtnIniciar from "./src/components/BtnIniciar";
import HomeScreen from "./src/screens/HomeScreen";
import RegistroScreen from "./src/screens/RegistroScreen"; // Asegúrate de que la ruta sea correcta

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <Text style={styles.letra}>Ingrese su correo electrónico</Text>
              <Formulario />

              <Text style={styles.letra}>Ingrese su contraseña</Text>
              <Formulario />

              <BtnIniciar />

              <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.letraReg}>Si aún no tiene una cuenta, presione aquí</Text>
              </TouchableOpacity>

              <StatusBar style="auto" />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8c39e",
    alignItems: "center",
    justifyContent: "center",
  },
  letra: {
    color: '#403428',
    fontSize: 18,
  },
  letraReg: {
    color: '#1d1f63',
  },
});
