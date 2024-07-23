import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../../Comman/Styles'

const Categoryscreen = () => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.newuser}>
                <Text style={styles.text1}>New User</Text>
            </Pressable>
        </View>
    )
}

export default Categoryscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    newuser: {
        backgroundColor: Colors.Button,
        padding: 5,
        width:'30%',
    },
    text1: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff'
    },
})