import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Profilescreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [mail, setMail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('name');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedMobile = await AsyncStorage.getItem('mobile');
        const storedPassword = await AsyncStorage.getItem('password');

        if (storedUsername && storedEmail && storedMobile &&storedPassword) {
          setFullname(storedUsername);
          setMail(storedEmail);
          setMobilenumber(storedMobile);
          setPassword(storedPassword)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Submit = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <View style={{ padding: 10 }}>
          <View>
            <Text style={styles.label}>Full Name</Text>
            <View style={{ position: 'absolute', top: 37, left: 6, zIndex: 1 }}>
              <MaterialIcons name="person" size={25} color="#385dab" />
            </View>
            <TextInput
              value={fullname}
              onChangeText={text => setFullname(text)}
              style={[styles.textinput, { paddingLeft: 33 }]}
              mode="outlined"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Email</Text>
            <View style={{ position: 'absolute', top: 37, left: 6, zIndex: 1 }}>
              <MaterialIcons name="email" size={25} color="#385dab" />
            </View>
            <TextInput
              value={mail}
              onChangeText={text => setMail(text)}
              style={[styles.textinput, { paddingLeft: 35 }]}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={{ position: 'absolute', top: 37, left: 6, zIndex: 1 }}>
              <MaterialIcons name="phone" size={25} color="#385dab" />
            </View>
            <TextInput
              value={mobilenumber}
              onChangeText={text => setMobilenumber(text)}
              style={[styles.textinput, { paddingLeft: 35 }]}
              mode="outlined"
              maxLength={10}
              keyboardType='numeric'
            />
          </View>

          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.label}>Password</Text>
            <View style={{ position: 'relative', zIndex: 1 }}>
              <View style={{ position: 'absolute', top: 15, left: 6, zIndex: 1 }}>
                <MaterialIcons name="lock" size={25} color="#385dab" />
              </View>
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                style={[styles.textinput, { paddingLeft: 35 }]}
                mode="outlined"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{ position: 'absolute', top: 15, right: 6, zIndex: 1 }}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={25}
                  color="#385dab"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button text="Submit" onPress={Submit} />
        </View>
      </View>
    </View>
  );
};

export default Profilescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottom: {
    margin: 10,
    backgroundColor: '#e6e8eb',
    height: '96%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textinput: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    color: '#000',
    fontSize: 16,
  },
});
