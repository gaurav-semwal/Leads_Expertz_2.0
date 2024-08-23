import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import { Add_Category, Get_Category } from '../../../Api/authApi';
import Toast from 'react-native-toast-message';
import { Table, Row, Rows } from 'react-native-table-component';

const Category = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [tableHead] = useState(['ID', 'Type', 'Name']);
    const [widthArr] = useState([50, 150, 200]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const onPressPlusButton = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleTypeChange = (itemValue) => {
        setSelectedType(itemValue);
        gecategoryapi(itemValue);
    };

    useEffect(() => {
        gecategoryapi();
    }, []);

    const gecategoryapi = async (typeId = '') => {
        try {
            const response = await Get_Category(typeId);
            if (response.msg === 'Load successfully.') {
                setCategories(response.data);
                if (typeId) {
                    setFilteredCategories(response.data.filter(category => category.type === typeId));
                } else {
                    setFilteredCategories(response.data);
                }
            } else {
                Toast.show({
                    text1: response.msg,
                    type: 'error',
                });
            }
        } catch (error) {
            Toast.show({
                text1: 'An error occurred',
                type: 'error',
            });
        }
    };

    const addCategoryApi = async () => {
        try {
            const response = await Add_Category(selectedType, categoryName);
            if (response.msg === 'Save successfully.') {
                const newCategory = { type: selectedType, name: categoryName };
                setCategories([...categories, newCategory]);
                setFilteredCategories([...filteredCategories, newCategory]);
                setModalVisible(false);
                Toast.show({
                    text1: response.msg,
                    type: 'success',
                });
                setSelectedType('');
                setCategoryName('');
            } else {
                Toast.show({
                    text1: 'Failed to save category',
                    type: 'error',
                });
            }
        } catch (error) {
            Toast.show({
                text1: 'An error occurred',
                type: 'error',
            });
        }
    };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const dataToDisplay = filteredCategories.slice(startIndex, endIndex);

        return dataToDisplay.map((rowData, index) => (
            <Row
                key={startIndex + index}
                data={[
                    (startIndex + index + 1).toString(),
                    rowData.type,
                    rowData.name
                ]}
                widthArr={widthArr}
                style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                textStyle={styles.text}
            />
        ));
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

        return (
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={styles.pageButton}
                    disabled={currentPage === 1}
                    onPress={() => setCurrentPage(currentPage - 1)}
                >
                    <AntDesign name="left" color="#625bc5" size={25} />
                </TouchableOpacity>
                <Text style={styles.pageText}>{currentPage} / {totalPages}</Text>
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

    return (
        <View style={styles.container}>
            {/* <View style={styles.top}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={selectedType}
                            onValueChange={handleTypeChange}
                        >
                            <Picker.Item label="Select Type" value="" />
                            <Picker.Item label="Residential" value="residential" />
                            <Picker.Item label="Commercial" value="commercial" />
                        </Picker>
                    </View>
                </View>
            </View> */}

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
                            <View style={styles.dropdownContainer}>
                                <Picker
                                    selectedValue={selectedType}
                                    style={styles.picker}
                                    onValueChange={handleTypeChange}
                                >
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
                                value={categoryName}
                                onChangeText={text => setCategoryName(text)}
                                style={styles.textInput}
                                mode="outlined"
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={addCategoryApi}>
                                <Text style={styles.modalButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* <View style={styles.pickerContainer}>
                <Text style={styles.text}>Show</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={itemsPerPage}
                        style={styles.picker}
                        onValueChange={(itemValue) => setItemsPerPage(itemValue)}
                    >
                        <Picker.Item label="10" value={10} />
                        <Picker.Item label="50" value={50} />
                        <Picker.Item label="100" value={100} />
                        <Picker.Item label="All" value={categories.length} />
                    </Picker>
                </View>
                <Text style={styles.text}>Entries</Text>
            </View> */}

            {selectedType ? (
                <Text style={styles.tableTitle}>
                    {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Categories
                </Text>
            ) : (
                <Text style={styles.tableTitle}>All Categories</Text>
            )}

            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row
                            data={tableHead}
                            widthArr={widthArr}
                            style={styles.header}
                            textStyle={[styles.text, { color: 'black' }]}
                        />
                        {renderTableRows()}
                    </Table>
                </View>
            </ScrollView>
            {/* {renderPagination()} */}

            <View style={styles.plusButtonContainer}>
                <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
                    <AntDesign name="plus" size={28} color="#dbdad3" />
                </Pressable>
            </View>
        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
        height: 350,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
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
    heading: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
    },
    dropdownContainer: {
        borderWidth: 1,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#625bc5',
        width: '100%',
        marginBottom: 10,
    },
    picker: {
        height: 48,
        color: 'black',
    },
    textInput: {
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        padding: 12,
        backgroundColor: '#625bc5',
        borderRadius: 5,
        alignItems: 'center',
        width: '47%',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    row: {
        height: 40,
        backgroundColor: '#E7E6E1',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    pageButton: {
        marginHorizontal: 5,
    },
    pageText: {
        color: '#625bc5',
        fontWeight: 'bold',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginBottom: 20,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginHorizontal: 10,
        width: 110,
        overflow: 'hidden',
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
});
