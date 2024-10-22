import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Componente para mostrar cada receta
const RecipeItem = ({ title, difficulty, isFirst }) => {
  return (
    <View style={[styles.recipeContainer, isFirst && styles.firstRecipeContainer]}>
      <View style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{title}</Text>
        <Text style={styles.recipeDifficulty}>{difficulty}</Text>
      </View>
    </View>
  );
};

// Componente principal de la pantalla de resultados de búsqueda
const SearchResultsScreen = () => {
  const navigation = useNavigation();
  const recipes = [
    { id: '1', title: 'Nombre Receta 1', difficulty: 'Fácil' },
    { id: '2', title: 'Nombre Receta 2', difficulty: 'Media' },
    { id: '3', title: 'Nombre Receta 3', difficulty: 'Difícil' },
  ];

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Lista de recetas */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RecipeItem
            title={item.title}
            difficulty={item.difficulty}
            isFirst={index === 0} // Agrega un indicador si es el primer elemento
          />
        )}
      />
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
  recipeDifficulty: {
    fontSize: 18,
    color: 'black',
  },
});

export default SearchResultsScreen;
