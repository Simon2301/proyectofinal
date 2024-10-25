import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        const savedUsername = await AsyncStorage.getItem('username');
        if (savedImage) setProfileImage({ uri: savedImage });
        if (savedUsername) setUsername(savedUsername);
      } catch (error) {
        console.error('Error loading profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      if (profileImage) {
        await AsyncStorage.setItem('profileImage', profileImage.uri);
      }
      await AsyncStorage.setItem('username', username);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile data', error);
    }
  };

  const handleChangePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={profileImage || require('../img/ImgUsuario.png')} style={styles.profileImage} />
      <TouchableOpacity style={styles.button} onPress={handleChangePhoto}>
        <Text style={styles.buttonText}>Cambiar Foto</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Nombre usuario</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nuevo nombre"
        placeholderTextColor="#C7A299"
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Realizar Cambios</Text>
      </TouchableOpacity>
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
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 40,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F5D5B2',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#C7A299',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5D5B2',
    color: 'black',
    width: '80%',
    textAlign: 'center',
  },
});

export default EditProfileScreen;
