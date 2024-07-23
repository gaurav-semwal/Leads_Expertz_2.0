import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Leadshomegrid from '../Components/Leadshomegrid';

const Homescreen = () => {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View style={styles.container}>
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
            <View style={styles.button}>
                <View style={styles.buttoncontainer}>
                <Text style={styles.text}>Quick Search</Text>
                </View>
                <View style={styles.buttoncontainer1}>
                <Text style={styles.text}>Add Quick Lead</Text>
                </View>
            </View>

            <Leadshomegrid/>
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
    }
});

export default Homescreen;
