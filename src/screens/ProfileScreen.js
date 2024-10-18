import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook para detectar si la pantalla está enfocada
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('Nombre Usuario');

  // Cargar datos del perfil cada vez que la pantalla esté enfocada
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        const savedUsername = await AsyncStorage.getItem('username');
        if (savedImage) {
          setProfileImage({ uri: savedImage });
        } else {
          setProfileImage(require('../img/ImgUsuario.png')); // Imagen por defecto si no hay guardada
        }
        if (savedUsername) {
          setUsername(savedUsername);
        }
      } catch (error) {
        console.error('Error loading profile data', error);
      }
    };

    if (isFocused) {
      loadProfileData(); // Recargar los datos cuando la pantalla esté enfocada
    }
  }, [isFocused]);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2A77B',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A67B58',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;
