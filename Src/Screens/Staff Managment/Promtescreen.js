import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Comman/Styles';
import {Picker} from '@react-native-picker/picker'


const Promtescreen = ({ navigation }) => {
    const navigateToAddUser = () => {
        navigation.navigate('Add User');
    };
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [widthArr] = useState([100, 150, 150, 100, 150, 100]);

    const upcomingBirthdays = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890', status: 'Active', role: 'Admin', tmid: 101, action: '1', promte: '2' },
        { id: 2, name: 'Alice Smith', email: 'alicesmith@example.com', phone: '987-654-3210', status: 'Inactive', role: 'User', tmid: 102, action: '1', promte: '2' },
        { id: 3, name: 'Bob Johnson', email: 'bjohnson@example.com', phone: '555-555-5555', status: 'Active', role: 'Manager', tmid: 103, action: '1', promte: '2' },
        { id: 4, name: 'Emily Brown', email: 'emilybrown@example.com', phone: '111-222-3333', status: 'Active', role: 'User', tmid: 104, action: '1', promte: '2' },
        { id: 5, name: 'Michael Davis', email: 'mdavis@example.com', phone: '999-888-7777', status: 'Inactive', role: 'Admin', tmid: 105, action: '1', promte: '2' },
    ];

    const renderPagination = () => {
        const totalPages = Math.ceil(upcomingBirthdays.length / itemsPerPage);

        return (
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={styles.pageButton}
                    disabled={currentPage === 1}
                    onPress={() => setCurrentPage(currentPage - 1)}
                >
                    <AntDesign name="left" color="#625bc5" size={25} />
                </TouchableOpacity>
                <Text style={styles.pageText}>
                    {currentPage} / {totalPages}
                </Text>
                <TouchableOpacity
                    style={styles.pageButton}
                    disabled={currentPage === totalPages}
                    onPress={() => setCurrentPage(currentPage + 1)}
                >
                    <AntDesign name="right" color="#625bc5" size={25} />
                </TouchableOpacity>
            </View>
        );
    };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const dataToDisplay = upcomingBirthdays.slice(startIndex, endIndex);

        return dataToDisplay.map((rowData, index) => (
            <Row
                key={rowData.id}
                data={[
                    rowData.name,
                    rowData.email,
                    rowData.phone,
                    rowData.status,
                    rowData.role,
                    rowData.tmid,
                    <Pressable style={styles.icon}>
                        <AntDesign name="edit" size={20} color="black" style={styles.iconhere} />
                    </Pressable>,
                    <Pressable style={styles.icon}>
                        <AntDesign name="edit" size={20} color="white" style={styles.iconhere1} />
                    </Pressable>
                ]}
                widthArr={widthArr}
                style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                textStyle={styles.text}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Manage User</Text>
                <Pressable style={styles.newuser} onPress={navigateToAddUser}>
                    <Text style={styles.text1}>New User</Text>
                </Pressable>
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.text}>Show</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={itemsPerPage}
                        style={styles.picker}
                        onValueChange={(itemValue) => setItemsPerPage(itemValue)}
                    >
                        <Picker.Item label="10" value={10} />
                        <Picker.Item label="100" value={100} />
                        <Picker.Item label="500" value={500} />
                        <Picker.Item label="All" value={upcomingBirthdays.length} />
                    </Picker>
                </View>
                <Text style={styles.text}>Entries</Text>
            </View>

            <View>
                <ScrollView horizontal>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row
                                data={['Name', 'Email', 'Phone', 'Status', 'Role', 'TM ID']}
                                widthArr={widthArr}
                                style={styles.header}
                                textStyle={[styles.text, { color: '#000' }]}
                            />
                            {renderTableRows()}
                        </Table>
                    </View>
                </ScrollView>
                {renderPagination()}
            </View>

        </View>
    );
};

export default Promtescreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000'
    },
    text1: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff'
    },
    newuser: {
        backgroundColor: Colors.Button,
        padding: 5
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
    },
    pageButton: {
        marginHorizontal: 10
    },
    pageText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#625bc5'
    },
    row: {
        height: 40,
        backgroundColor: '#E7E6E1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000'
    },
    icon:{
        alignItems:'center',
    },
    iconhere:{
        backgroundColor:'yellow',
        padding:4
    },
    iconhere1:{
        backgroundColor:'green',
        padding:4
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginHorizontal: 10,
        width: 109, 
        overflow: 'hidden'
    },
    picker: {
        height: 25, 
        color: '#000' 
    },
});
