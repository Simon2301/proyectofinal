import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BtnIniciar = () => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);

  const handlePressIn = () => {
    setOpacity(0.5);
  };

  const handlePressOut = () => {
    setOpacity(1);
  };

  const handlePress = () => {
    navigation.navigate('Home'); // Navega a la nueva pantalla Home
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { opacity }]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f5e1ce',
    padding: 10,
    borderRadius: 10,
    borderColor: '#b08e6b',
    borderWidth: 2,
    marginBottom: 10,
  },
  buttonText: {
    color: '#403428',
    textAlign: 'center',
  },
});

export default BtnIniciar;
