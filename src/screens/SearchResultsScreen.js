import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Base URL para las imágenes de recetas
const IMAGE_BASE_URL = 'https://spoonacular.com/recipeImages/';

// Componente para mostrar cada receta
// Construir URL para la imagen
const RecipeItem = ({ title, image, id, usedIngredients, missedIngredients, isFirst }) => {
  // Si la URL de la imagen no es completa, construirla con el ID
  const imageUrl = image.includes('http') ? image : `${IMAGE_BASE_URL}${id}-312x231.jpg`;

  return (
    <View style={[styles.recipeContainer, isFirst && styles.firstRecipeContainer]}>
      <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{title}</Text>
      </View>
    </View>
  );
};

// Componente principal de la pantalla de resultados de búsqueda
const SearchResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recetas } = route.params;  // Obtener recetas de los parámetros de navegación

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Verificar si hay recetas */}
      {recetas.length > 0 ? (
        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <RecipeItem
              title={item.title}
              image={item.image}  // Imagen de la receta
              usedIngredients={item.usedIngredientCount}
              missedIngredients={item.missedIngredientCount}
              isFirst={index === 0} // Agrega un indicador si es el primer elemento
            />
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No se encontraron recetas.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2A77B',
    padding: 15,
  },
  backButton: {
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  recipeContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#F5D5B2',
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  recipeImage: {
    width: 100,
    height: 100,
    backgroundColor: '#A67B58',
    marginRight: 20,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  recipeIngredients: {
    fontSize: 18,
    color: 'black',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 50,
  },
});

export default SearchResultsScreen;

