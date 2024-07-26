import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const dummyData = [
  {
    id: 1,
    name: 'John Doe',
    mobile: '1234567890',
    status: 'Pending',
    source: 'Website',
    comments: 'Interested in our product',
    created_date: '2024-07-26',
  },
  {
    id: 2,
    name: 'Jane Smith',
    mobile: '0987654321',
    status: 'Contacted',
    source: 'Referral',
    comments: 'Asked for more details',
    created_date: '2024-07-25',
  },
];

const Userlist = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const leadedit = (item) => {
    console.log('Edit lead:', item);
  };

  const openModal = (item) => {
    console.log('Open modal:', item);
  };

  const handlePhonePress = (phone) => {
    console.log('Phone press:', phone);
  };

  const editlead = (item) => {
    console.log('Edit lead:', item);
  };

  const handleRecordNotes = (item) => {
    console.log('Record notes:', item);
  };

  const Item = ({ item }) => (
    <Pressable>
      <View style={styles.leadContainer}>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable style={styles.editButton} onPress={() => leadedit(item)}>
            <Text style={styles.editButtonText}>User Edit</Text>
          </Pressable>
          <Pressable style={styles.editButton1} onPress={() => openModal(item)}>
            <Text style={styles.editButtonText1}>{item.status}</Text>   
          </Pressable>
        </View> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={styles.profileContainer}>
              {/* <Image style={styles.profileImage} source={require('../Assets/Images/profile.jpg')} /> */}
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
          <Pressable onPress={() => editlead(item)}>
            <AntDesign name="edit" size={25} color="black" />
          </Pressable>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.leadInfo1}>Lead ID: {item.id}</Text>
          <Text style={styles.leadInfo1}>Source: {item.source}</Text>
          <Text style={styles.leadInfo1}>Comments: {item.comments}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.leadInfo1}>Date: {item.created_date}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const onPressPlusButton = () => {
    navigation.navigate('Add User');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <Item item={item} />}
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
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton1: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 5,
  },
  editButtonText1: {
    color: '#fff',
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
  recordButton: {
    backgroundColor: '#FFC107',
    borderRadius: 5,
    padding: 5,
  },
  recordButtonText: {
    color: '#fff',
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
  leadContainer: {
    padding: 10,
    borderRadius: 6,
    borderColor: '#ede8e8',
    borderWidth: 1,
    backgroundColor: '#ede8e8',
    marginBottom: 10
  },
  editButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#625bc5',
    padding: 5,
    borderRadius: 4,
  },
  editButton1: {
    alignSelf: 'flex-start',
    backgroundColor: '#929496',
    padding: 5,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
  },
  editButtonText1: {
    color: '#fff',
  },
  leadTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  leadInfo: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  leadInfo1: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  recordButton: {
    backgroundColor: '#929496',
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  recordButtonText: {
    color: '#fff',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  modalText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
  },
  closeButton: {
    backgroundColor: '#625bc5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    width: '90%',
  },
  modalheading: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  commentsContainer: {
    height:'30%',
    padding:10
  },
});

export default Userlist;
