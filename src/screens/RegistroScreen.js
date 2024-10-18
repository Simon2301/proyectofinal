import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Formulario from "../components/Formulario"; // Asegúrate de que esta ruta sea correcta

const RegistroScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Pantalla de Registro</Text>
    <Formulario /> {/* Aquí llamas al componente directamente */}
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8c39e',
  },
  text: {
    fontSize: 24,
    color: '#403428',
  },})
  
export default RegistroScreen;

