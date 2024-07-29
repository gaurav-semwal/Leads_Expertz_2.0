import { Pressable, StyleSheet, Text, View, FlatList ,ScrollView} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Homescreentable from './Homescreentable';

const data = [
    { id: '1', title: 'New Leads' },
    { id: '2', title: 'Pending Leads' },
    { id: '3', title: 'Processing Leads' },
    { id: '4', title: 'Interested Leads' },
    { id: '5', title: 'Sales Manager New Leads' },
    { id: '6', title: 'Call Schedule Leads' },
    { id: '7', title: 'Visit Schedule Leads' },
    { id: '8', title: 'Visit Done Leads' },
    { id: '9', title: 'Booked Leads' },
    { id: '10', title: 'Completed' },
    { id: '11', title: 'Cancelled' },
    { id: '12', title: 'Other Leads' },
];

const Leadshomegrid = () => {
    const renderItem = ({ item, index }) => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        return (
            <View style={styles.item}>
                <View style={styles.content}>
                    <View style={[styles.icon, { backgroundColor: randomColor }]}>
                        <FontAwesome5 name="funnel-dollar" size={20} color="white" />
                    </View>
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.title1}>(%)</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={data}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <ScrollView>
            <Homescreentable/>
            </ScrollView>
         
        </View>
    );
};

export default Leadshomegrid;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        borderRadius: 10,
        shadowColor: '#888',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 1,
        elevation: 6,
        flex: 1,
        margin: 8,
        padding: 5
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black',
        marginLeft: 10,
    },
    title1: {
        fontSize: 15,
        fontWeight: '400',
        color: '#666',
        marginLeft: 10,
    },
    icon: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
