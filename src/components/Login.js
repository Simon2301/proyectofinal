import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = () => {
    console.log('Correo Electrónico:', correo);
    console.log('Contraseña:', contrasena);
    // Navegar a la pantalla "InicioApp" después de iniciar sesión
    navigation.navigate('InicioApp'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.letra}>Ingrese su Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder="abc@gmail.com"
      />
      <Text style={styles.letra}>Ingrese su Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={contrasena}
        onChangeText={setContrasena}
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.letraR}>¿Aún no tiene una cuenta? Regístrese aquí</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  },
  letraR: {
    marginTop: '30%',
    marginBottom: -20,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderColor: '#B08E6B', // Color del borde
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f5e1ce",
    marginVertical: 30,
  },
  button: {
    height: 40,
    width: 250,
    borderRadius: 20,
    backgroundColor: "#f5e1ce",
    borderWidth: 1,
    borderColor: '#B08E6B', // Color del borde
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  buttonText: {
    color: '#2c241c', // Cambia el color del texto si es necesario
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
