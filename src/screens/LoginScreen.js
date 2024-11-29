import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async () => {
    if (!correo || !contrasena) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.34:4040/login', {
        correo,
        contrasena,
      });

      if (response.status === 200) {
        // Si las credenciales son correctas
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('Inicio'); // Redirigir a la pantalla principal
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert('Error', 'Credenciales incorrectas');
        } else {
          Alert.alert('Error', 'Hubo un problema con el inicio de sesión');
        }
      } else {
        Alert.alert('Error', 'No se pudo conectar al servidor');
      }
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrese su Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder="abc@gmail.com"
        placeholderTextColor="#C7A299"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Ingrese su Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
        placeholderTextColor="#C7A299"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.redirectText}>¿Aún no tiene una cuenta? Regístrese aquí</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegistroScreen')}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
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
    padding: 20,
  },
  label: {
    color: "#2c241c",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '95%',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#B08E6B',
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f5e1ce",
  },
  button: {
    height: 40,
    width: '90%',
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
  redirectText: {
    marginTop: 20,
    color: "#2c241c",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
