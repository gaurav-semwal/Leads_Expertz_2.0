import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Pressable, Modal, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Colors } from '../Comman/Styles';

const Header = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageicon}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
        <Entypo name="menu" size={23} color="#dbdad3" />
      </TouchableOpacity>
            <Image
              style={styles.image}
              source={require('../Assets/headerimage.png')}
            />
          </View>

          <View style={styles.icons}>
            <View style={{ right: 10 }}>
              <AntDesign name="user" size={23} color="#dbdad3" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    backgroundColor: Colors.Button,
  },
  menuButton: {
    marginRight: 10,
  },
  image: {
    height: 40,
    width: 140,
    alignItems: 'center',
    left: 10
  },
  imageicon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 10,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});