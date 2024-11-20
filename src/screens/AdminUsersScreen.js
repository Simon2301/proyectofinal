import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const AdminUsersScreen = () => {
  // Datos estáticos de ejemplo para mostrar en la lista
  const users = [
    { id: '1', name: 'Usuario 1', email: 'usuario1@example.com' },
    { id: '2', name: 'Usuario 2', email: 'usuario2@example.com' },
    { id: '3', name: 'Usuario 3', email: 'usuario3@example.com' },
    { id: '4', name: 'Usuario 4', email: 'usuario4@example.com' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2A77B',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E342E',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  userItem: {
    backgroundColor: '#A67B58',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userEmail: {
    fontSize: 16,
    color: '#FFF',
  },
  backButton: {
    backgroundColor: '#4E342E',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminUsersScreen;
