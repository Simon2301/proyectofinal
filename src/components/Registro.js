import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleRegister = () => {
    // Validar que todos los campos estén completos
    if (!nombre || !correo || !contrasena || !confirmarContrasena) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Si todo está bien, navega a la pantalla de inicio
    console.log('Nombre:', nombre);
    console.log('Correo:', correo);
    console.log('Contraseña:', contrasena);
    navigation.navigate('InicioApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.letra}>Ingrese su Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre completo"
      />
      <Text style={styles.letra}>Ingrese su Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder="abc@gmail.com"
        keyboardType="email-address"
      />
      <Text style={styles.letra}>Ingrese su Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
      />
      <Text style={styles.letra}>Confirme su Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={confirmarContrasena}
        onChangeText={setConfirmarContrasena}
        placeholder="Confirme su contraseña"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.letraR}>¿Ya tiene una cuenta? Inicie sesión aquí</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inicio')} // Navegar a la pantalla "App.js" (Inicio)
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8c39e",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  letra: {
    color: "#2c241c",
    marginBottom: -20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  letraR: {
    marginTop: '10%',
    marginBottom: 20,
    color: "#2c241c",
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderColor: '#B08E6B',
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f5e1ce",
  },
  button: {
    height: 40,
    width: 250,
    borderRadius: 20,
    backgroundColor: "#f5e1ce",
    borderWidth: 1,
    borderColor: '#B08E6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#2c241c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
