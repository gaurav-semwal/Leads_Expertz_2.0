import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import { Add_Category } from '../../../Api/authApi';
import Toast from 'react-native-toast-message';

const Category = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedtype, setselectedtype] = useState('');
    const [categoryname, setCategoryname] = useState('')

    const onPressPlusButton = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handletypeChange = itemValue => {
        console.log(itemValue);
        setselectedtype(itemValue);
    };

    const Addcategoryapi = async () => {
        console.log(selectedtype, categoryname);
        try {
            const response = await Add_Category(selectedtype, categoryname);
            console.log('category', response);
            if (response.msg === 'Save successfully.') {
                setModalVisible(false);
                Toast.show({
                    text1: response.msg,
                    type: 'success',
                  });
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.plusButtonContainer}>
                <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
                    <AntDesign name="plus" size={28} color="#dbdad3" />
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View>
                            <Text style={styles.heading}>Select Type</Text>
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

                        <View>
                            <Text style={styles.heading}>Select Category Name</Text>

                            <TextInput
                                label="Category Name"
                                value={categoryname}
                                onChangeText={text => setCategoryname(text)}
                                style={[styles.textinput]}
                                mode="outlined"
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={Addcategoryapi}>
                                <Text style={styles.modalButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    plusButtonContainer: {
        position: 'absolute',
        backgroundColor: '#625bc5',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        alignSelf: 'flex-end',
        bottom: 20,
        right: 20,
    },
    plusButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        height:250,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection:'column',
        justifyContent:'space-between'
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#625bc5',
        borderRadius: 5,
        alignItems: 'center',
        width: '47%'
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    picker: {
        borderBlockColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
    },
    dropdowncontainer1: {
        borderWidth: 1,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#625bc5',
        width: '100%'
    },
    heading: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black'
    }
});
