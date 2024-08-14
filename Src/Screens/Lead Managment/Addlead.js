import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Comman/Styles';
import { TextInput } from 'react-native-paper';
import Button from '../../Components/Button';
import { Picker } from '@react-native-picker/picker';
import {
  Add_Lead,
  Get_Campaigns,
  Get_Category,
  Get_City,
  Get_Project,
  Get_Source,
  Get_State,
  Get_Sub_Category,
} from '../../../Api/authApi';
import Toast from 'react-native-toast-message';
import validator from 'validator';

const Addlead = ({ navigation }) => {
  const [mobilenumner, setmobilenumber] = useState('');
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [source, setsource] = useState([]);
  const [selectedSource, setSelectedSource] = useState('');
  const [type, settype] = useState([]);
  const [selectedtype, setselectedtype] = useState('');
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [project, setproject] = useState([]);
  const [selectedproject, setselectedproject] = useState('');
  const [campigns, setcampigns] = useState([]);
  const [selectedcampigns, setselectedcampigns] = useState('');
  const [city, setcity] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [classification, setclassification] = useState([]);
  const [selectedclassification, setselectedclassification] = useState('');
  const [comments, setcomments] = useState('');
  const [address, setaddress] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [whatsapp, setwhatsapp] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getstate();
    gecategoryapi();
    getsource();
    getcampaigns();
    getproject();
  }, []);

  const handleaddleads = async () => { };

  const handleSourceChange = itemValue => {
    setSelectedSource(itemValue);
  };

  const handleclassificationChange = itemValue => {
    setselectedclassification(itemValue);
  };

  const handlecampignsChange = itemValue => {
    setselectedcampigns(itemValue);
  };

  const handleprojectChange = itemValue => {
    setselectedproject(itemValue);
  };

  const handleEmailChange = text => {
    setemail(text);
    if (validator.isEmail(text)) {
      setError('');
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleStateChange = (itemValue, itemIndex) => {
    setSelectedState(itemValue);
    getcity(itemValue);
  };

  const handleCategory = (itemValue, itemIndex) => {
    setSelectedCategory(itemValue);
    getSubcategory(itemValue);
  };
  const handleSubcategoryChange = itemValue => {
    setSelectedSubcategory(itemValue);
  };

  const handletypeChange = itemValue => {
    console.log(itemValue);
    setselectedtype(itemValue);
    gecategoryapi(itemValue);
  };

  const gecategoryapi = async typeId => {
    console.log(typeId);
    try {
      const response = await Get_Category(typeId);
      console.log('category', response);
      if (response.msg === 'Load successfully.') {
        setCategory(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getstate = async () => {
    try {
      const response = await Get_State();
      if (response.msg === '') {
        const stateData = response.data.map(item => item.state);
        setStates(stateData);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getcity = async itemValue => {
    try {
      const response = await Get_City(itemValue);

      if (response.msg === '') {
        setcity(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getSubcategory = async category_id => {
    try {
      const response = await Get_Sub_Category(category_id);
      if (response.msg === 'Load successfully.') {
        setSubcategory(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getsource = async () => {
    try {
      const response = await Get_Source();
      console.log(response)
      if (response.msg === 'Load successfully.') {
        setsource(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getcampaigns = async () => {
    try {
      const response = await Get_Campaigns();
      if (response.msg === 'Load successfully.') {
        setcampigns(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: response.msg,
        type: 'error',
      });
    } finally {
    }
  };

  const getproject = async () => {
    try {
      const response = await Get_Project();
      if (response.msg === 'Load successfully.') {
        setproject(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: response.msg,
        type: 'error',
      });
    } finally {
    }
  };

  const Submit = async () => {
    console.log(
      selectedtype,
      selectedCategory,
      selectedSubcategory,
      selectedSource,
      selectedcampigns,
      selectedclassification,
      selectedproject,
      selectedState,
      selectedCity,
      address,
      fullname,
      email,
      mobilenumner,
      whatsapp,)
    try {
      const response = await Add_Lead(
        selectedtype,
        selectedCategory,
        selectedSubcategory,
        selectedSource,
        selectedcampigns,
        selectedclassification,
        selectedproject,
        selectedState,
        selectedCity,
        address,
        fullname,
        email,
        mobilenumner,
        whatsapp
      );

      console.log(response)
      if (response.msg === "Unauthorized request") {
        navigation.navigate('Login');
      }
      else
        if (response.result.msg === "Save successfully") {
          Toast.show({
            text1: 'Save Successfully',
            type: 'success',
          });
          navigation.navigate('Home');
        } else {
          Toast.show({
            text1: response.msg,
            type: 'error',
          });
        }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: response.msg,
        type: 'error',
      });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View>
          <Pressable
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="phone" color="#625bc5" size={25} />
          </Pressable>
          <TextInput
            label="Contact Number"
            value={mobilenumner}
            onChangeText={text => {
              const formattedText = text.replace(/[^0-9]/g, '');
              setmobilenumber(formattedText.slice(0, 10));
            }}
            style={[styles.textinput, { paddingLeft: 30 }]}
            mode="outlined"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View>
          <Pressable
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="user" color="#625bc5" size={25} />
          </Pressable>
          <TextInput
            label="Full Name"
            value={fullname}
            onChangeText={text => setfullname(text)}
            style={[styles.textinput, { paddingLeft: 30 }]}
            mode="outlined"
          />
        </View>

        <View>
          <Pressable
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="mail" color="#625bc5" size={25} />
          </Pressable>
          <>
            <TextInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              style={[styles.textinput, { paddingLeft: 30 }]}
              mode="outlined"
              maxLength={100}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedSource}
              style={styles.picker}
              onValueChange={handleSourceChange}>
              <Picker.Item label="Select Source" value="" />
              {source.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.name} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedtype}
              style={styles.picker}
              onValueChange={handletypeChange}>
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Residential" value="residential" />
              <Picker.Item label="Commercial" value="commercial" />
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.picker}
              onValueChange={handleCategory}>
              <Picker.Item label="Select Category" value="" />
              {category.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedSubcategory}
              style={styles.picker}
              onValueChange={handleSubcategoryChange}>
              <Picker.Item label="Select Sub Category" value="" />
              {subcategory.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedclassification}
              style={styles.picker}
              onValueChange={handleclassificationChange}>
              <Picker.Item label="Select Classification" value="" />
              <Picker.Item label="Hot" value="hot" />
              <Picker.Item label="Cold" value="cold" />
            </Picker>
          </View>
        </View>

        <View style={styles.dob}>
          <View style={{ width: '49%' }}>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedcampigns}
                style={styles.picker}
                onValueChange={handlecampignsChange}>
                <Picker.Item label="Select Campigns" value="" />
                {campigns.map((src, index) => (
                  <Picker.Item key={index} label={src.name} value={src.name} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ width: '49%' }}>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedproject}
                style={styles.picker}
                onValueChange={handleprojectChange}>
                <Picker.Item label="Select Project" value="" />
                {project.map((src, index) => (
                  <Picker.Item
                    key={index}
                    label={src.project_name}
                    value={src.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.dob}>
          <View style={styles.dropdowncontainer}>
            <Picker
              selectedValue={selectedState}
              dropdownIconRippleColor={1}
              style={styles.picker}
              onValueChange={handleStateChange}>
              <Picker.Item label="Select State" value="" />
              {states.map((state, index) => (
                <Picker.Item key={index} label={state} value={state} />
              ))}
            </Picker>
          </View>

          <View style={styles.dropdowncontainer}>
            <Picker
              selectedValue={selectedCity}
              style={styles.picker}
              onValueChange={city => setSelectedCity(city)}>
              <Picker.Item label="Select City" value="" />
              {city.map((state, index) => (
                <Picker.Item
                  key={index}
                  label={state.city}
                  value={state.city}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View>
          <TextInput
            label="Enter Address"
            value={address}
            onChangeText={text => setaddress(text)}
            style={[styles.textinput]}
            mode="outlined"
          />
        </View>

        {/* <View>
          <TextInput
            label="Enter Comments"
            value={comments}
            onChangeText={text => setcomments(text)}
            style={[styles.textinput]}
            mode="outlined"
          />
        </View> */}

        <View>
          <TextInput
            label="Enter Whatsapp number"
            value={whatsapp}
            onChangeText={text => setwhatsapp(text)}
            style={[styles.textinput]}
            mode="outlined"
            maxLength={10}
            keyboardType='numeric'
          />
        </View>
      </View>

      <Pressable style={{ top: 20 }} onPress={Submit}>
        <Button text="Submit" />
      </Pressable>

      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
};

export default Addlead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinput: {
    marginTop: 10,
  },
  form: {
    margin: 10,
  },
  dob: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  picker: {
    borderBlockColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  dropdowncontainer: {
    width: '49%',
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
  },
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
  },
});
