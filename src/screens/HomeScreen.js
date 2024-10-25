import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const apiKey = '6e0ad0cae8e14e5f935bd3991235608d';

const buscarRecetasPorNombre = async (nombre) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/search`, {
      params: {
        query: nombre,
        apiKey: apiKey,
        number: 5, 
      }
    });
    return response.data.results; 
  } catch (error) {
    console.error('Error al buscar recetas:', error);
    return [];
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [nombreReceta, setNombreReceta] = useState('');  

  const handleSearch = async () => {
    let recetas = [];

    if (nombreReceta) {
      recetas = await buscarRecetasPorNombre(nombreReceta);
    }

    navigation.navigate('SearchResultsScreen', { recetas });
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Gourmetly</Text>

      {/* Descripción */}
      <Text style={styles.subtitle}>Busque la receta que desee</Text>

      {/* Input de receta */}
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre de una receta"
        placeholderTextColor="#C7A299"
        value={nombreReceta}
        onChangeText={setNombreReceta}  // Actualizar el estado
      />

      {/* Botón de búsqueda */}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2A77B',
    padding: 20,
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: '#B08E6B',
    backgroundColor: '#F5D5B2',
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F5D5B2',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B08E6B',
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default HomeScreen;
