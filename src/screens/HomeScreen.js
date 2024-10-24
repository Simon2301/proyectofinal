import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Clave API obtenida de spoonacular
const apiKey = '6e0ad0cae8e14e5f935bd3991235608d';

// Realizar una solicitud para buscar recetas por nombre
const buscarRecetasPorNombre = async (nombre) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: nombre,
        apiKey: apiKey,
        number: 5,  // Número de recetas que quieres obtener
      }
    });
    // Retorna los resultados tal cual sin modificar la URL de la imagen
    return response.data.results;
  } catch (error) {
    console.error('Error al buscar recetas:', error);
    return [];
  }
};

// Función para buscar recetas por ingredientes
const buscarRecetasPorIngredientes = async (ingredientes) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: ingredientes,  // Los ingredientes separados por comas
        apiKey: apiKey,
        number: 5,  // Número de recetas que quieres obtener
      }
    });
    return response.data;  // Retorna los resultados
  } catch (error) {
    console.error('Error al buscar recetas por ingredientes:', error);
    return [];
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [nombreReceta, setNombreReceta] = useState('');  // Estado para el nombre de la receta
  const [ingredientes, setIngredientes] = useState('');  // Estado para los ingredientes

  const handleSearch = async () => {
    let recetas = [];

    // Verificar si hay nombre de receta o ingredientes
    if (nombreReceta) {
      recetas = await buscarRecetasPorNombre(nombreReceta);
    } else if (ingredientes) {
      recetas = await buscarRecetasPorIngredientes(ingredientes);
    }

    // Navegar a la pantalla de resultados de búsqueda y pasar las recetas
    navigation.navigate('SearchResultsScreen', { recetas });
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Nombre App</Text>

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

      {/* Input de ingrediente */}
      <Text style={styles.subtitle}>Si desea ingrese algún ingrediente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese un ingrediente"
        placeholderTextColor="#C7A299"
        value={ingredientes}
        onChangeText={setIngredientes}  // Actualizar el estado
      />

      {/* Botón de búsqueda */}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Sección de imagen */}
      <View style={styles.imageSection}>
        <Text style={styles.imageText}>FOTO ¿?</Text>
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
});

export default HomeScreen;
