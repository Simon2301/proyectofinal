import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FavoritesContext } from '../context/FavoritesContext';

const apiKey = '6e0ad0cae8e14e5f935bd3991235608d';

const RecipeDetailsScreen = () => {
  const route = useRoute();
  const { receta } = route.params;

  const [detallesReceta, setDetallesReceta] = React.useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const [esFavorito, setEsFavorito] = React.useState(false);

  React.useEffect(() => {
    const obtenerDetallesReceta = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${receta.id}/information`, {
          params: {
            apiKey: apiKey,
          },
        });
        setDetallesReceta(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la receta:', error);
      }
    };

    obtenerDetallesReceta();

    setEsFavorito(isFavorite(receta.id));
  }, [receta.id]);

  const toggleFavorito = () => {
    if (esFavorito) {
      removeFavorite(receta.id);
    } else {
      addFavorite(receta);
    }
    setEsFavorito(!esFavorito);
  };

  if (!detallesReceta) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  const source = {
    html: detallesReceta.instructions || '<p>Instrucciones no disponibles</p>',
  };

  const imageUrl = `https://spoonacular.com/recipeImages/${receta.image}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.recipeTitle}>{receta.title}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorito} style={styles.favoriteIcon}>
        <Icon name={esFavorito ? 'star' : 'star-border'} size={30} color="#FFD700" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      {detallesReceta.extendedIngredients.map((ingrediente, index) => (
        <Text key={index} style={styles.ingredientText}>
          {ingrediente.original}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instrucciones:</Text>
      <RenderHtml contentWidth={300} source={source} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2A77B',
    padding: 15,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  recipeImage: {
    width: 250, 
    height: 150,
    resizeMode: 'cover', 
    borderWidth: 3,
    borderColor: '#B08E6B', 
    borderRadius: 8, 
  },
  titleContainer: {
    marginTop: 20,
  },
  favoriteIcon: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  recipeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: 'black',
  },
  ingredientText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
});

export default RecipeDetailsScreen;
