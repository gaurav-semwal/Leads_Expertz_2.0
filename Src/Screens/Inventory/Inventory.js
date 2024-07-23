import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Comman/Styles';

const Inventory = ({ navigation }) => {
    const navigateToAddUser = () => {
        navigation.navigate('Add User');
    };

    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [widthArr] = useState([50, 100, 150, 150, 150, 200, 100, 100, 100, 100, 100, 100, 100, 100,100]);

    const upcomingBirthdays = [
        { id: 1, type: 'Type1', categoryName: 'Category1', subCategoryName: 'SubCategory1', propertyName: 'Property1', description: 'Description1', location: 'Location1', size: 'Size1', price: 'Price1', image1: 'Image1', image2: 'Image2', image3: 'Image3', image4: 'Image4', image5: 'Image5', action: 'Action1' },
        { id: 2, type: 'Type2', categoryName: 'Category2', subCategoryName: 'SubCategory2', propertyName: 'Property2', description: 'Description2', location: 'Location2', size: 'Size2', price: 'Price2', image1: 'Image1', image2: 'Image2', image3: 'Image3', image4: 'Image4', image5: 'Image5', action: 'Action2' },
        { id: 3, type: 'Type3', categoryName: 'Category3', subCategoryName: 'SubCategory3', propertyName: 'Property3', description: 'Description3', location: 'Location3', size: 'Size3', price: 'Price3', image1: 'Image1', image2: 'Image2', image3: 'Image3', image4: 'Image4', image5: 'Image5', action: 'Action3' },
        { id: 4, type: 'Type4', categoryName: 'Category4', subCategoryName: 'SubCategory4', propertyName: 'Property4', description: 'Description4', location: 'Location4', size: 'Size4', price: 'Price4', image1: 'Image1', image2: 'Image2', image3: 'Image3', image4: 'Image4', image5: 'Image5', action: 'Action4' },
        { id: 5, type: 'Type5', categoryName: 'Category5', subCategoryName: 'SubCategory5', propertyName: 'Property5', description: 'Description5', location: 'Location5', size: 'Size5', price: 'Price5', image1: 'Image1', image2: 'Image2', image3: 'Image3', image4: 'Image4', image5: 'Image5', action: 'Action5' },
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
                    rowData.type,  // Type
                    rowData.categoryName,  // Category Name
                    rowData.subCategoryName,  // Sub Category Name
                    rowData.propertyName,  // Property Name
                    rowData.description,  // Description
                    rowData.location,  // Location
                    rowData.size,  // Size
                    rowData.price,  // Price
                    rowData.image1,  // Image 1
                    rowData.image2,  // Image 2
                    rowData.image3,  // Image 3
                    rowData.image4,  // Image 4
                    rowData.image5,  // Image 5
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
                <Text style={styles.text}>Manage Inventory</Text>
                <Pressable style={styles.newuser} onPress={navigateToAddUser}>
                    <Text style={styles.text1}>New Item</Text>
                </Pressable>
            </View>

            <View>
                <ScrollView horizontal>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row
                                data={['S.No', 'Type', 'Category Name', 'Sub Category Name', 'Property Name', 'Description', 'Location', 'Size', 'Price', 'Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5', 'Action']}
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

export default Inventory;

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
    icon: {
        alignItems: 'center',
    },
    iconhere: {
        backgroundColor: 'yellow',
        padding: 4
    },
    iconhere1: {
        backgroundColor: 'green',
        padding: 4
    }
});
