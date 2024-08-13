import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Button from '../../Components/Button';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Add_User, Get_Role } from '../../../Api/authApi';
import Toast from 'react-native-toast-message';

const Updateuser = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getrole();
  }, []);

  const getrole = async () => {
    const password = await AsyncStorage.getItem('password');
    const email = await AsyncStorage.getItem('email');
    try {
      const response = await Get_Role(email, password);
      if (response.data) {
        setRoles(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await Add_User(name, mobile, email, password, selectedValue);
      if (response.msg === "Unauthorized request") {
        navigation.navigate('Login');
    } 
    else
      if (response.msg === 'Save successfully.') {
        Toast.show({
          text1: 'Save Successfully',
          type: 'success',
        });
        navigation.navigate('User List');
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error occurred',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={[styles.textinput]}
          mode="outlined"
        />
        <TextInput
          label="Contact Number"
          value={mobile}
          onChangeText={text => {
            const formattedText = text.replace(/[^0-9]/g, '');
            setMobile(formattedText.slice(0, 10));
          }}
          style={[styles.textinput]}
          mode="outlined"
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.textinput]}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.textinput]}
          mode="outlined"
        />
        <View style={styles.dropdowncontainer1}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}>
            <Picker.Item label='Select Role' value="" />
            {roles.map((role) => (
              <Picker.Item key={role.id} label={role.role_name} value={role.role_name} />
            ))}
          </Picker>
        </View>
      </View>
      <Pressable style={{ top: 20 }} onPress={handleSubmit} disabled={loading}>
        <Button text="Submit" />
      </Pressable>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Updateuser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    padding: 10,
  },
  textinput: {
    marginTop: 10,
  },
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});