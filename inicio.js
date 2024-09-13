import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Nombre App</Text>

      {/* Descripción */}
      <Text style={styles.subtitle}>Busque la receta que desee</Text>

      {/* Input de receta */}
      <TextInput
        style={styles.input}
        placeholder="Ingrese una receta"
        placeholderTextColor="#C7A299"
      />

      {/* Input de ingrediente */}
      <Text style={styles.subtitle}>Si desea ingrese algún ingrediente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese un ingrediente"
        placeholderTextColor="#C7A299"
      />

      {/* Botón de búsqueda */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Sección de imagen */}
      <View style={styles.imageSection}>
        <Text style={styles.imageText}>FOTO ¿?</Text>
      </View>

      {/* Barra de navegación */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Text style={styles.icon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>⭐</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>📝</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2A77B',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#C7A299',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5D5B2',
    color: 'black',
  },
  button: {
    backgroundColor: '#F5D5B2',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  imageSection: {
    flex: 1,
    backgroundColor: '#A67B58',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageText: {
    fontSize: 20,
    color: 'black',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D2A77B',
    paddingVertical: 10,
  },
  icon: {
    fontSize: 30,
    color: 'black',
  },
});

export default App;
