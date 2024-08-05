import { Pressable, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Homescreentable from './Homescreentable';
import { Dashboard } from '../../Api/authApi';
import Toast from 'react-native-toast-message'; // Make sure Toast is imported properly

const Leadshomegrid = () => {
    const [leads, setLeads] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {
        try {
            const response = await Dashboard();
            console.log('D A S H B O A R D -->', response.data.leads);

            if (response.data && response.data.leads && response.data.leads.length > 0) {
                const leadData = response.data.leads[0];
                setLeads(leadData);

                // Extract categories based on the keys of the lead data
                const categoriesList = Object.keys(leadData).map((key) => ({
                    id: key,
                    title: formatTitle(key), // Convert key to user-friendly title
                    key: key,
                }));
                setCategories(categoriesList);
            } else {
                console.warn('Unexpected response format:', response);
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const formatTitle = (key) => {
        // Convert key to a more readable title
        const formatted = key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
        return formatted;
    };

    const renderItem = ({ item }) => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const leadCount = leads[item.key] || '0'; // Use the 'key' from 'categories' array

        return (
            <View style={styles.item}>
                <View style={styles.content}>
                    <View style={[styles.icon, { backgroundColor: randomColor }]}>
                        <FontAwesome5 name="funnel-dollar" size={20} color="white" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.title1}>{leadCount}</Text>
                    </View>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ height: '58%' }}>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <ScrollView>
                <Homescreentable />
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
        flex: 1,
        margin: 8,
        padding: 5,
        borderRadius: 10,
        shadowColor: '#e0dad3',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 6,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black',
        flexWrap: 'wrap',
    },
    title1: {
        fontSize: 15,
        fontWeight: '400',
        color: '#666',
        flexWrap: 'wrap',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
