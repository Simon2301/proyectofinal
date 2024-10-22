// src/components/RecipeItem.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RecipeItem = ({ title, difficulty }) => {
  return (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/100' }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.difficulty}>{difficulty}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5D5B2',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  difficulty: {
    fontSize: 16,
    color: 'black',
  },
});

export default RecipeItem;
