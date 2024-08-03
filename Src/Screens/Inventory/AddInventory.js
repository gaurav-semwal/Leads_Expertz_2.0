import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import Button from '../../Components/Button';
import { Picker } from '@react-native-picker/picker';
import {
    Add_Inventory,
    Get_Category,
    Get_City,
    Get_State,
    Get_Sub_Category,
} from '../../../Api/authApi';
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';

const AddInventory = ({ navigation }) => {
    const [selectedtype, setselectedtype] = useState('');
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [city, setcity] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [classification, setclassification] = useState([]);
    const [address, setaddress] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [property, setproperty] = useState('');
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('');
    const [size, setsize] = useState('');
    const [fileUri, setFileUri] = useState(null);
    const [fileUri1, setFileUri1] = useState(null);
    const [fileUri2, setFileUri2] = useState(null);
    const [fileUri3, setFileUri3] = useState(null);
    const [fileUri4, setFileUri4] = useState(null);

    useEffect(() => {
        getstate();
    }, []);

    const handleFilePick = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets && response.assets.length > 0) {
                setFileUri(response.assets[0].uri);
            }
        });
    };

    const handleFilePick1 = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets && response.assets.length > 0) {
                setFileUri1(response.assets[0].uri);
            }
        });
    };

    const handleFilePick2 = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets && response.assets.length > 0) {
                setFileUri2(response.assets[0].uri);
            }
        });
    };

    const handleFilePick3 = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets && response.assets.length > 0) {
                setFileUri3(response.assets[0].uri);
            }
        });
    };

    const handleFilePick4 = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets && response.assets.length > 0) {
                setFileUri4(response.assets[0].uri);
            }
        });
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

    const uriToFile = async (uri, name) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const file = new File([blob], name, { type: blob.type });
        return file;
    };

    const Submit = async () => {
        console.log(
            selectedtype,
            selectedCategory,
            selectedSubcategory,
            selectedState,
            selectedCity,
            address,
            description,
            price,
            size,
            fileUri,
            fileUri1,
            fileUri2,
            fileUri3,
            fileUri4
        );

        try {
            const response = await Add_Inventory(
                selectedtype,
                selectedCategory,
                selectedSubcategory,
                property, 
                description,
                address,
                price,
                size,
                fileUri,
                fileUri1,
                fileUri2,
                fileUri3,
                fileUri4
            );

            console.log(response);

            if (response.msg === "Save successfully.") {
                Toast.show({
                    text1: response.msg,
                    type: 'success',
                });
                navigation.navigate('Inventory');
            } else {
                Toast.show({
                    text1: response.msg,
                    type: 'error',
                });
            }
        } catch (error) {
            console.log("Error:", error);
            Toast.show({
                text1: 'An error occurred. Please try again.',
                type: 'error',
            });
        }
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>

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

                <View>
                    <TextInput
                        label="Enter Property Name"
                        value={property}
                        onChangeText={text => setproperty(text)}
                        style={[styles.textinput]}
                        mode="outlined"
                    />
                </View>

                <View>
                    <TextInput
                        label="Enter Description"
                        value={description}
                        onChangeText={text => setdescription(text)}
                        style={[styles.textinput]}
                        mode="outlined"
                    />
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
                        label="Enter Price"
                        value={price}
                        onChangeText={text => setprice(text)}
                        style={[styles.textinput]}
                        mode="outlined"
                    />
                </View>

                <View>
                    <TextInput
                        label="Enter Size"
                        value={size}
                        onChangeText={text => setsize(text)}
                        style={[styles.textinput]}
                        mode="outlined"
                    />
                </View>

                <View style={styles.filePickerContainer}>
                    <Pressable style={styles.filePickerButton} onPress={handleFilePick}>
                        <Text style={styles.filePickerText}>
                            {fileUri ? 'File Selected' : 'Choose File'}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.filePickerContainer}>
                    <Pressable style={styles.filePickerButton} onPress={handleFilePick1}>
                        <Text style={styles.filePickerText}>
                            {fileUri1 ? 'File Selected' : 'Choose File'}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.filePickerContainer}>
                    <Pressable style={styles.filePickerButton} onPress={handleFilePick2}>
                        <Text style={styles.filePickerText}>
                            {fileUri2 ? 'File Selected' : 'Choose File'}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.filePickerContainer}>
                    <Pressable style={styles.filePickerButton} onPress={handleFilePick3}>
                        <Text style={styles.filePickerText}>
                            {fileUri3 ? 'File Selected' : 'Choose File'}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.filePickerContainer}>
                    <Pressable style={styles.filePickerButton} onPress={handleFilePick4}>
                        <Text style={styles.filePickerText}>
                            {fileUri4 ? 'File Selected' : 'Choose File'}
                        </Text>
                    </Pressable>
                </View>

            </View>

            <Pressable style={{ top: 20 }} onPress={Submit}>
                <Button text="Submit" />
            </Pressable>

            <View style={{ height: 30 }}></View>
        </ScrollView>
    );
};

export default AddInventory;

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
    filePickerContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    filePickerButton: {
        padding: 10,
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#555'
    },
    filePickerText: {
        color: 'black'
    },
});
