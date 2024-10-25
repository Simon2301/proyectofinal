import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useNavigation } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';

// Clave API obtenida de Spoonacular
const apiKey = '6e0ad0cae8e14e5f935bd3991235608d';

const RecipeDetailsScreen = () => {
  const route = useRoute();
  const { receta } = route.params;
  const [detallesReceta, setDetallesReceta] = React.useState(null);

  React.useEffect(() => {
    const obtenerDetallesReceta = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${receta.id}/information`, {
          params: {
            apiKey: apiKey,
          }
        });
        setDetallesReceta(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la receta:', error);
      }
    };

    obtenerDetallesReceta();
  }, [receta.id]);

  if (!detallesReceta) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  const source = {
    html: detallesReceta.instructions || '<p>Instrucciones no disponibles</p>'
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: receta.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{receta.title}</Text>

      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      {detallesReceta.extendedIngredients.map((ingrediente, index) => (
        <Text key={index} style={styles.ingredientText}>
          {ingrediente.original}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Instrucciones:</Text>
      <RenderHtml
        contentWidth={300}  // Ajusta esto según sea necesario
        source={source}
        baseStyle={styles.instructionsText}
      />
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
  recipeImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
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
  instructionsText: {
    fontSize: 16,
    color: 'black',
  },
});

export default RecipeDetailsScreen;
