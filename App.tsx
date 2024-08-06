// Dear Programmer,🤖
// When I wrote this code, only God and I knew how it worked.🛐
// Now, only God knows!😄🕉
// Therefore, if you attempt to optimize this routine and it fails (which is highly likely),💯
// please increase this counter as a warning for the next person:🔼
// Total hours wasted on this: 76
//
// Copyright (c) 2024 Gaurav Semwal and Chaishta Bassi. All rights reserved.

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
