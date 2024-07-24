import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Comman/Styles';

const Category = ({ navigation }) => {
    const navigateToAddUser = () => {
        navigation.navigate('Add User');
    };

    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [widthArr] = useState([100, 150, 150, 100]);  // Updated width array to match columns

    const upcomingBirthdays = [
        { id: 1, name: 'Gaurav Semwal', email: 'gauravsemwal@example.com', phone: '123-456-7890', status: 'Active', role: 'Admin', action: 'View Details' },
        { id: 2, name: 'Saurav Semwal', email: 'saurav.semwal@example.com', phone: '987-654-3210', status: 'Inactive', role: 'User', action: 'View Details' },
        { id: 3, name: 'Raghav Mehta', email: 'raghavmehta26@example.com', phone: '555-555-5555', status: 'Active', role: 'Manager', action: 'View Details' },
        { id: 4, name: 'Kavita Pant', email: 'pant@example.com', phone: '111-222-3333', status: 'Active', role: 'User', action: 'View Details' },
        { id: 5, name: 'Manan Sakhuja', email: 'manansakhuja123@example.com', phone: '999-888-7777', status: 'Inactive', role: 'Admin', action: 'View Details' },
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
                    (startIndex + index + 1).toString(),  // S.No
                    rowData.name,  // Name
                    rowData.role,  // Type (assuming 'role' is used as 'Type')
                    rowData.action  // Action
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

            <View>
                <ScrollView horizontal>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row
                                data={['S.No', 'Name', 'Type', 'Action']}
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

export default Category;

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
});
