import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Get_User } from '../../../Api/authApi';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const Userlist = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchAvatars = async (users) => {
    const avatarPromises = users.map(async (user) => {
      try {
        const response = await fetch('https://random-data-api.com/api/v2/users');
        const text = await response.text(); 
        try {
          const data = JSON.parse(text); 
          return { ...user, avatar: data.avatar };
        } catch {
          console.error('Error: Response not in JSON format');
          return { ...user, avatar: null };
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
        return { ...user, avatar: null };
      }
    });
    return Promise.all(avatarPromises);
  };

  const fetchData = async () => {
    try {
      const response = await Get_User();
      console.log(response);
      if (response.msg === 'Load successfully.') {
        const usersWithAvatars = await fetchAvatars(response.data);
        setUserData(usersWithAvatars);
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  const handlePhonePress = (phone) => {
    console.log('Phone press:', phone);
  };

  const onPressPlusButton = () => {
    navigation.navigate('Add User'); 
  };

  const Item = ({ item, navigation }) => {
    const editlead = () => {
      navigation.navigate('AppDrawer');
    };

    return (
      <Pressable>
        <View style={styles.leadContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <View style={styles.profileContainer}>
                <Image 
                  style={styles.profileImage} 
                  source={{ uri: item.avatar || 'https://via.placeholder.com/150' }} // Use placeholder if avatar is null
                  onError={(e) => console.error('Error loading image:', e.nativeEvent.error)}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.leadTitle}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.leadInfo}>{item.mobile}</Text>
                  <TouchableOpacity onPress={() => handlePhonePress(item.mobile)}>
                    <View style={{ marginLeft: 10 }}>
                      <AntDesign name="phone" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Pressable onPress={editlead}>
              <AntDesign name="edit" size={25} color="black" />
            </Pressable>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.leadInfo1}>Lead ID: {item.id}</Text>
            <Text style={styles.leadInfo1}>Role: {item.role}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.leadInfo1}>Created Date: {item.created_date}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <View style={styles.plusButtonContainer}>
        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={28} color="#dbdad3" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leadContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  leadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leadInfo: {
    fontSize: 14,
    color: '#555',
  },
  leadInfo1: {
    fontSize: 12,
    color: '#888',
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
    alignSelf: 'flex-end',
    bottom: 20,
    right: 20,
  },
  plusButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Userlist;
