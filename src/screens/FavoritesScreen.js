import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FavoritesContext } from '../context/FavoritesContext';

// Base URL para las imágenes de recetas
const IMAGE_BASE_URL = 'https://spoonacular.com/recipeImages/';

// Componente para mostrar cada receta
const RecipeItem = ({ title, image, onPress, isFirst }) => (
  <TouchableOpacity
    style={[styles.recipeContainer, isFirst && styles.firstRecipeContainer]}
    onPress={onPress}
  >
    <Image source={{ uri: `${IMAGE_BASE_URL}${image}` }} style={styles.recipeImage} />
    <View style={styles.recipeInfo}>
      <Text style={styles.recipeTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

// Componente principal de la pantalla de favoritos
const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      {/* Verificar si hay favoritos */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <RecipeItem
              title={item.title}
              image={item.image}
              onPress={() => navigation.navigate('RecipeDetailsScreen', { recipe: item })}
              isFirst={index === 0} // Añadir indicador si es el primer elemento
            />
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No hay recetas favoritas aún.</Text>
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
  recipeContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#F5D5B2',
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  firstRecipeContainer: {
    marginTop: 40, // Añadir margen superior solo para la primera receta
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 50,
  },
});

export default FavoritesScreen;
