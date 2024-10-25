import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IMAGE_BASE_URL = 'https://spoonacular.com/recipeImages/';

const RecipeItem = ({ title, image, id, usedIngredients, missedIngredients, isFirst }) => {
  const navigation = useNavigation();  // Asegúrate de obtener la navegación aquí
  const imageUrl = image.includes('http') ? image : `${IMAGE_BASE_URL}${id}-312x231.jpg`;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecipeDetailsScreen', { receta: { id, title, image } })}
    >
      <View style={[styles.recipeContainer, isFirst && styles.firstRecipeContainer]}>
        <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchResultsScreen = () => {
  const navigation = useNavigation();  // Asegúrate de obtener la navegación aquí
  const route = useRoute();
  const { recetas } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {recetas.length > 0 ? (
        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <RecipeItem
              title={item.title}
              image={item.image}
              id={item.id}
              usedIngredients={item.usedIngredientCount}
              missedIngredients={item.missedIngredientCount}
              isFirst={index === 0}
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

