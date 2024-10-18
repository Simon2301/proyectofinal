import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const ListaScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('LT'); // Unidad inicial por defecto
  const [ingredientsList, setIngredientsList] = useState([]);

  // Función para agregar ingrediente a la lista
  const addIngredient = () => {
    if (ingredient && quantity) {
      setIngredientsList([
        ...ingredientsList,
        { id: Date.now().toString(), ingredient, quantity, unit },
      ]);
      setIngredient('');
      setQuantity('');
      setUnit('LT');
      setIsModalVisible(false);
    }
  };

  // Función para eliminar un ingrediente de la lista
  const removeIngredient = (id) => {
    const newList = ingredientsList.filter((item) => item.id !== id);
    setIngredientsList(newList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Ingredientes</Text>
      <FlatList
        data={ingredientsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ingredientContainer}>
            <Text style={styles.ingredientText}>{`${item.ingredient} x ${item.quantity} ${item.unit}`}</Text>
            <TouchableOpacity onPress={() => removeIngredient(item.id)}>
              <Icon name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Icon name="add" size={30} color="black" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ingrese ingrediente</Text>
            <TextInput
              style={styles.input}
              value={ingredient}
              onChangeText={setIngredient}
              placeholder="Ingrese ingrediente"
              placeholderTextColor="#C7A299"
            />
            <Text style={styles.modalText}>Ingrese la cantidad</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Ingrese la cantidad"
              placeholderTextColor="#C7A299"
              keyboardType="numeric" // Este prop asegura que solo se acepten valores numéricos
            />
            <Text style={styles.modalText}>Seleccione unidad</Text>
            <Picker
              selectedValue={unit}
              onValueChange={(itemValue) => setUnit(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="LT" value="LT" />
              <Picker.Item label="GR" value="GR" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={addIngredient}>
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    color: 'black',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#A67B58',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#A67B58',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#A67B58',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  ingredientText: {
    color: 'black',
    fontWeight: 'bold',
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
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#F5D5B2',
    borderRadius: 10,
    color: 'black',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#F5D5B2',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default ListaScreen;
