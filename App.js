import { StatusBar } from 'expo-status-bar';
import reacteact from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Formulario from "./src/components/Formulario";
import BtnIniciar from "./src/components/BtnIniciar"

export default function App() {
    return(
    <View style={styles.container}>
      <Text>Ingrese su correo electronico</Text>
      <Formulario />
      
      <Text>Ingrese su contraseña</Text>
      <Formulario />

      <BtnIniciar />
      <StatusBar style="auto"/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8c39e",
    alignItems: "center",
    justifyContent: "center",
  },
});