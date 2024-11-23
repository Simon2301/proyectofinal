  import React, { useState } from 'react';
  import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
  import axios from 'axios';

  export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    const handleRegister = async () => {
      if (!nombre || !correo || !contrasena || !confirmarContrasena) {
        Alert.alert('Error', 'Todos los campos son obligatorios');
        return;
      }
    
      if (contrasena !== confirmarContrasena) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
    
      try {
        const response = await axios.post('http://127.0.0.1:4040/registro', {
          nombre,
          correo,
          contrasena,
        });
        
    
        if (response.status === 201) {
          Alert.alert('Éxito', 'Usuario creado exitosamente');
          setNombre('');
          setCorreo('');
          setContrasena('');
          setConfirmarContrasena('');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            Alert.alert('Error', 'El correo ya está registrado');
          } else {
            Alert.alert('Error', 'No se pudo crear el usuario');
          }
        } else {
          Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
        }
        console.error(error);
      }
    };
    
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Ingrese su Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre completo"
          placeholderTextColor="#C7A299"
        />
        <Text style={styles.label}>Ingrese su Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="abc@gmail.com"
          keyboardType="email-address"
          placeholderTextColor="#C7A299"
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
        <Text style={styles.label}>Confirme su Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={confirmarContrasena}
          onChangeText={setConfirmarContrasena}
          placeholder="Confirme su contraseña"
          secureTextEntry={true}
          placeholderTextColor="#C7A299"
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.label}>¿Ya tiene una cuenta? Inicie sesión aquí</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}
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
      padding: 20,
    },
    letra: {
      color: "#2c241c",
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
      width: '100%',
      paddingHorizontal: 20,
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
