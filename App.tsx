import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Stacknavigation from './Src/Navigation/Stacknavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <View style={styles.container}>
      <Stacknavigation />
      <Toast />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
