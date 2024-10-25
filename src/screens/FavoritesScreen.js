import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';

const IMAGE_BASE_URL = 'https://spoonacular.com/recipeImages/';

const RecipeItem = ({ title, image, onPress, isFirst }) => (
  <TouchableOpacity
    style={[styles.recipeContainer, isFirst && styles.firstRecipeContainer]}
    onPress={onPress}
  >
    <Image 
      source={{ uri: image ? `${IMAGE_BASE_URL}${image}` : 'https://via.placeholder.com/100' }} 
      style={styles.recipeImage} 
    />
    <View style={styles.recipeInfo}>
      <Text style={styles.recipeTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favorites } = useContext(FavoritesContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar recetas según la búsqueda
  const filteredFavorites = favorites.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <TextInput
        style={[styles.searchInput, { marginTop: 40 }]} 
        placeholder="Buscar receta favorita..."
        placeholderTextColor="#C7A299"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Verificar si hay favoritos */}
      {filteredFavorites.length > 0 ? (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <RecipeItem
              title={item.title}
              image={item.image}
              onPress={() => navigation.navigate('RecipeDetailsScreen', { receta: item })}
              isFirst={index === 0} 
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
  searchInput: {
    height: 40,
    borderColor: '#C7A299',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F5D5B2',
    color: 'black',
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
    marginTop: 40, 
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
