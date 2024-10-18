import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Favoritos</Text>
    {/* Contenido de Favoritos */}
  </View>
);

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
});

export default FavoritesScreen;
