import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('Nombre Usuario');

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        const savedUsername = await AsyncStorage.getItem('username');

        if (savedImage) {
          setProfileImage({ uri: savedImage });
        } else {
          setProfileImage(require('../img/ImgUsuario.png')); 
        }

        if (savedUsername) {
          setUsername(savedUsername);
        }
      } catch (error) {
        console.error('Error loading profile data', error);
      }
    };

    if (isFocused) {
      loadProfileData(); 
    }
  }, [isFocused]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const handleAdminUsers = () => {
    navigation.navigate('AdminUsersScreen'); // Navegar a la pantalla de administración de usuarios
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        {/* Botón siempre visible */}

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
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  profileImage: {
    width: 180, 
    height: 180, 
    borderRadius: 90,
    marginBottom: 20,
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
