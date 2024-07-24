import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Pressable, Linking } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors } from '../../../Comman/Styles';

const Notpicked = () => {
    const navigation = useNavigation();

    const [activeButton, setActiveButton] = useState('All');
    const [callScheduleData, setCallScheduleData] = useState([
        { id: 1, sno: 1, name: 'John Doe', campaign: 'Campaign A', source: 'Medium', status: 'In Progress', city: 'hydrabad', classification: 'High', leadDate: '2023-01-01', followupDate: '2023-01-02', lastcomment: 'Lorem ipsum', action: 'action' },
        { id: 2, sno: 2, name: 'Alice Smith', campaign: 'Campaign B', source: 'Low', status: 'In Progress', city: 'mumbai', classification: 'Medium', leadDate: '2023-01-02', followupDate: '2023-01-03', lastcomment: 'Dolor sit amet', action: 'action' },
        // Add more dummy data as needed
    ]);
    const [visitScheduleData, setVisitScheduleData] = useState([
        { id: 1, sno: 1, name: 'Bob Brown', campaign: 'Campaign C', source: 'High', status: 'Completed', city: 'chennai', classification: 'Low', leadDate: '2023-01-03', followupDate: '2023-01-04', lastcomment: 'Consectetur adipiscing elit', action: 'action' },
        { id: 2, sno: 2, name: 'Emily Johnson', campaign: 'Campaign D', source: 'High', status: 'Completed', city: 'chennai', classification: 'High', leadDate: '2023-01-04', followupDate: '2023-01-05', lastcomment: 'Sed do eiusmod tempor', action: 'action' },
        // Add more dummy data as needed
    ]);
    const [missedFollowUpData, setMissedFollowUpData] = useState([
        { id: 1, sno: 1, name: 'David Lee', campaign: 'Campaign E', source: 'Low', status: 'Cancelled', city: 'delhi', classification: 'Medium', leadDate: '2023-01-05', followupDate: '2023-01-06', lastcomment: 'Ut labore et dolore magna', action: 'action' },
        { id: 2, sno: 2, name: 'Sarah Clark', campaign: 'Campaign F', source: 'Medium', status: 'In Progress', city: 'hydrabad', classification: 'High', leadDate: '2023-01-06', followupDate: '2023-01-07', lastcomment: 'Ut enim ad minim veniam', action: 'action' },
        // Add more dummy data as needed
    ]);
    const [tableHead] = useState(['S.No', 'Lead ID', 'Agent Name', 'Source', 'Campaign', 'Status', 'Name', 'City', 'Classification', 'Lead Date', 'Followup Date', 'Last Comment', 'Action']);
    const [widthArr] = useState([50, 80, 80, 60, 100, 100, 100, 100, 100, 100, 150, 150, 100]);
    const [tableData, setTableData] = useState(callScheduleData);
    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const onPressButton = (type) => {
        setActiveButton(type);
        setCurrentPage(1);
        switch (type) {
            case 'All':
                setTableData([
                    ...callScheduleData,
                    ...visitScheduleData,
                    ...missedFollowUpData
                ]);
                break;
            case 'Team':
                setTableData(visitScheduleData);
                break;
            case 'Self':
                setTableData(missedFollowUpData);
                break;
            default:
                setTableData(callScheduleData);
        }
    };

    const leadedit = (rowData) => {
        navigation.navigate('leadupdate', { leadid: rowData.id, status: rowData.status });
    };

    const renderTableRows = () => {
        let dataToDisplay = tableData;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return Array.isArray(dataToDisplay) && dataToDisplay.slice(startIndex, endIndex).map((rowData, index) => (
            <Row
                key={startIndex + index}
                data={[
                    rowData.sno.toString(),
                    rowData.id.toString(),
                    rowData.name,
                    rowData.source,
                    rowData.campaign,
                    rowData.status,
                    rowData.name,
                    rowData.city,
                    rowData.classification,
                    rowData.leadDate,
                    rowData.followupDate,
                    rowData.lastcomment,
                    rowData.action
                ]}
                widthArr={widthArr}
                style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                textStyle={styles.text}
            />
        ));
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(tableData.length / itemsPerPage);

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
            <View style={styles.body}>
                <Pressable
                    style={[
                        styles.button,
                        activeButton === 'All' && { backgroundColor: '#ddf' },
                    ]}
                    onPress={() => onPressButton('All')}
                >
                    <Text style={[styles.text, activeButton === 'All' && { color: '#625bc5' }]}>All</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        activeButton === 'Team' && { backgroundColor: '#ddf' }
                    ]}
                    onPress={() => onPressButton('Team')}
                >
                    <Text style={[styles.text, activeButton === 'Team' && { color: '#625bc5' }]}>Team</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        activeButton === 'Self' && { backgroundColor: '#ddf' }
                    ]}
                    onPress={() => onPressButton('Self')}
                >
                    <Text style={[styles.text, activeButton === 'Self' && { color: '#625bc5' }]}>Self</Text>
                </Pressable>
            </View>
            <View>
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row
                                data={tableHead}
                                widthArr={widthArr}
                                style={styles.header}
                                textStyle={[styles.text, { color: '#FFFFFF' }]}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 50,
        backgroundColor: '#625bc5'
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    row: {
        height: 40,
        backgroundColor: '#E7E6E1'
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    pageButton: {
        marginHorizontal: 5
    },
    pageText: {
        color: '#625bc5',
        fontWeight: 'bold'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    button: {
        borderWidth: 1,
        borderColor: Colors.Button,
        width: '30%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#e6ebf5',
    },
    callIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        marginRight: 10
    },
});

export default Notpicked;
