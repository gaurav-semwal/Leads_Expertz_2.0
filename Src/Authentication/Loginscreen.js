import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Provider as Paperprovider, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Components/Button';
import Toast from 'react-native-toast-message';
import { Login_Api } from '../../Api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Loginscreen = ({ navigation }) => {

  const [loading, setLoading] = useState(false);

  // const handleLoginPress = async () => {
  //   navigation.navigate('AppDrawer');
  //   // try {
  //   //   setLoading(true);
  //   //   const response = await Login(mobilenumner, password);
  //   //   if (response.msg === "User logged in successfully.") {
  //   //     await AsyncStorage.removeItem('authToken');

  //   //     await AsyncStorage.setItem('authToken', response.data.token);
  //   //     await AsyncStorage.setItem('userPassword', response.data.password);
  //   //     await AsyncStorage.setItem('mobile', response.data.mobile);

  //   //     Toast.show({
  //   //       text1: 'User login successful',
  //   //       type: 'success',
  //   //     });

  //   //     navigation.navigate('bottom');
  //   //   } else {
  //   //     Toast.show({
  //   //       text1: 'Failed to login!',
  //   //       type: 'error',
  //   //     });
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   Toast.show({
  //   //     text1: 'Error',
  //   //     type: 'error',
  //   //   });
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // };
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  useEffect(() => {
    checkForToken(); 
  }, []);

  const checkForToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    
    if (token) {
      navigation.navigate('AppDrawer');
    }
  };

  const handleLoginPress = async () => {
    try {
      if (!email || !password) {
        Toast.show({
          text1: 'Please enter both Email and password',
          type: 'error',
        });
        return;
      }

      console.log('email:', email);
      console.log('password:', password);

      const response = await Login_Api(email, password);
      console.log(response);
      if (response.msg === 'User logged in successfully.') {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.setItem('authToken', response.data.token);
        await AsyncStorage.setItem('email', response.data.email);
        await AsyncStorage.setItem('password', response.data.password);

        Toast.show({
          text1: 'Login Successfull',
          type: 'success',
        });

        navigation.navigate('AppDrawer');
      } else {
        Toast.show({
          text1: 'Failed to login',
          type: 'error',
        });
      }
    } catch (error) {
      console.log('Login Error:', error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  return (
    <Paperprovider style={styles.container}>

      {/* {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )} */}

      <View>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={require('../Assets/logo.png')}
        />
        <View style={styles.textinputview}>
          <View>
            <View style={{ position: 'absolute', top: 25, left: 13, zIndex: 1 }}>
              <MaterialCommunityIcons name="email" size={25} color="#625bc5" />
            </View>
            <TextInput
              placeholder="Enter Your Email"
              value={email}
              onChangeText={text => setemail(text)} 
              style={[styles.textinput, { paddingLeft: 20 }]}
              mode="outlined"
            />
          </View>
          <View>
            <View style={{ position: 'absolute', top: 25, left: 13, zIndex: 1 }}>
              <MaterialCommunityIcons name="lock" size={25} color="#625bc5" />
            </View>
            <View>
            <TextInput
              placeholder="Enter Your Password"
              value={password}
              mode="outlined"
              onChangeText={text => setpassword(text)} 
              style={[styles.textinput, { paddingLeft: 20 }]}
            />
            </View>
          </View>
        </View>
        <Pressable style={{ top: 20 }} onPress={handleLoginPress}>
          <Button text="Login" />
        </Pressable>
      </View>
    </Paperprovider>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  eye: {
    alignItems: 'flex-end',
    bottom: '45%',
    marginRight: "6%"
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    height: '40%',
    width: '80%',
    alignSelf: 'center',
  },
  textinput: {
    marginBottom: 10,
    margin: 10,
  },
});
