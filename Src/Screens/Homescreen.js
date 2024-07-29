import React, { useState } from 'react';
import { View, StyleSheet, Text,Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Leadshomegrid from '../Components/Leadshomegrid';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Homescreen = ({navigation}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const onPressPlusButton = () => {
          navigation.navigate('Add Lead');
      };

    return (
        <View style={styles.container}>
                <View style={styles.button}>
                <View style={styles.buttoncontainer}>
                <Text style={styles.text}>Quick Search</Text>
                </View>
                <View style={styles.buttoncontainer1}>
                <Text style={styles.text}>Add Quick Lead</Text>
                </View>
            </View>
            <View style={styles.dropdowncontainer1}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Self" value="Self" />
                    <Picker.Item label="Team" value="Team" />
                </Picker>  

            </View>
            <Leadshomegrid/>

            <View style={styles.plusButtonContainer}>
        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={28} color="#dbdad3" />
        </Pressable>
      </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    dropdowncontainer1: {
        borderWidth: 1,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#625bc5',
        marginTop: 6,
        margin: 10
    },
    button:{
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:10,
        alignItems:'center'
    },
    buttoncontainer:{
        height:38,
        width:'30%',
        borderRadius:10,
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center'
    },
    buttoncontainer1:{
        height:38,
        width:'30%',
        borderRadius:10,
        backgroundColor:'#625bc5',
        alignItems:'center',
        marginLeft:10,
        justifyContent:'center'
    },
    text:{
        color:'white'
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
        alignSelf:'flex-end',
        bottom:20,
        right:20,
      },
      plusButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default Homescreen;
