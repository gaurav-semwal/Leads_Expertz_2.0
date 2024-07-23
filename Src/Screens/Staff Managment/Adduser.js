import { StyleSheet, Text, View,Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import Button from '../../Components/Button';
import { Picker } from '@react-native-picker/picker';

const Adduser = () => {
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.form}>

                <TextInput
                    label="Full Name"
                    value={name}
                    onChangeText={text => setname(text)}
                    style={[styles.textinput]}
                    mode="outlined"
                />

                <TextInput
                    label="Contact Number"
                    value={mobile}
                    onChangeText={text => {
                        const formattedText = text.replace(/[^0-9]/g, '');
                        setmobile(formattedText.slice(0, 10));
                    }}
                    style={[styles.textinput]}
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={10}
                />

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setemail(text)}
                    style={[styles.textinput]}
                    mode="outlined"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={text => setpassword(text)}
                    style={[styles.textinput]}
                    mode="outlined"
                />

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
            </View>

            <Pressable style={{ top: 20 }}>
          <Button text="Submit" />
        </Pressable>
        </View>
    )
}

export default Adduser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    form: {
        padding: 10
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
})