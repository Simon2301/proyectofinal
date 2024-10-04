import React from 'react';
import {  StyleSheet,
    Button,
    View,
    SafeAreaView,} from 'react-native';


const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaView>
<Button style={styles.btn}
  title="Iniciar Sesión"
  color="#f5e1ce"
  
/>
    </SafeAreaView>);



const styles = StyleSheet.create({
    btn: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 20,
    },
});

export default App;
