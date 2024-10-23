import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FavoritesContext } from '../context/FavoritesContext'; // Importamos el contexto

// Base URL para las imágenes de recetas
const IMAGE_BASE_URL = 'https://spoonacular.com/recipeImages/';

const RecipeDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params;  // Obtener la receta de los parámetros de navegación
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Acceder a los favoritos y función para toggle

  const isFavorite = favorites.some(fav => fav.id === recipe.id); // Verificar si la receta es favorita

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Imagen de la receta */}
      <Image source={{ uri: `${IMAGE_BASE_URL}${recipe.image}` }} style={styles.recipeImage} />

      {/* Título de la receta */}
      <Text style={styles.recipeTitle}>{recipe.title}</Text>

      {/* Estrella para marcar como favorito */}
      <TouchableOpacity onPress={() => toggleFavorite(recipe)} style={styles.favoriteButton}>
        <Icon
          name="star"
          size={36}
          color={isFavorite ? 'yellow' : 'gray'}
        />
      </TouchableOpacity>

      {/* Descripción de la receta */}
      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.descriptionText}>{recipe.description || 'Descripción no disponible.'}</Text>

      {/* Ingredientes de la receta */}
      <Text style={styles.sectionTitle}>Ingredientes</Text>
      {recipe.ingredients ? (
        recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredientText}>
            - {ingredient}
          </Text>
        ))
      ) : (
        <Text style={styles.descriptionText}>No hay ingredientes disponibles.</Text>
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
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  favoriteButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
  },
  ingredientText: {
    fontSize: 18,
    color: 'black',
  },
});

export default RecipeDetailsScreen;
