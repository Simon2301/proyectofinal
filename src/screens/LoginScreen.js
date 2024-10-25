import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = () => {
    console.log('Correo Electrónico:', correo);
    console.log('Contraseña:', contrasena);
    navigation.navigate('Inicio'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.letra}>Ingrese su Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder="abc@gmail.com"
        placeholderTextColor="#C7A299"
      />
      <Text style={styles.letra}>Ingrese su Contraseña:</Text>
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

      <Text style={styles.letraR}>¿Aún no tiene una cuenta? Regístrese aquí</Text>
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
  letra: {
    color: "#2c241c",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '95%',
    paddingHorizontal: 20,
    flexWrap: 'nowrap', 
  },
  letraR: {
    marginTop: 20,
    marginBottom: 10,
    color: "#2c241c",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
});
