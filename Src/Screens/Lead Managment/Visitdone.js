import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Get_Lead,Get_Lead_Data } from '../../../Api/authApi';
import { Colors } from '../../Comman/Styles';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Visitdone = ({navigation}) => {
  const [activeButton, setActiveButton] = useState('All');
  const [leadData, setLeadData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getUser();
  }, [activeButton]);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await Get_Lead();
      if (response.msg === 'Load successfully') {
        console.log("HI THERE CHECKING NEW LEAD", response);
        const filteredLeads = response.data?.filter(lead => lead.status === 'VISIT DONE') || [];
        setLeadData(filteredLeads);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onPressButton = type => {
    setActiveButton(type);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getUser();
    setRefreshing(false);
  };

  const openModal = async item => {
    setModalVisible(true);
    try {
      const response = await Get_Lead_Data(item.id);
      if (response.msg === 'Load successfully') {
        setSelectedItem(response.data);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  const handlePhonePress = phone => {
    console.log('Phone press:', phone);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const LeadModal = ({ item }) => {
    if (!item) return null;

    const leadComments = item.lead_comment || [];

    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal} // This is still needed to handle hardware back button
      >
        <View style={styles.centeredView}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Lead Details</Text>
                <Pressable onPress={closeModal}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={25}
                    color="#625bc5"
                  />
                </Pressable>
              </View>

              <ScrollView contentContainerStyle={{}}>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                  <Text style={styles.modalText}>
                    Name: {item.name || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Email: {item.email || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Mobile: {item.phone || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Address: {item.field3 || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    DOB: {item.app_dob || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    DOA: {item.app_doa || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Source: {item.source || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Type: {item.type || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Category: {item.cat_name || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    SubCategory: {item.subcatname || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    State: {item.field1 || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    City: {item.field2 || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Classification: {item.classification || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Project: {item.project_id || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Campaign: {item.campaign || 'N/A'}
                  </Text>
                  <Text style={styles.modalText}>
                    Status: {item.status || 'N/A'}
                  </Text>
                </View>

                <View style={{ padding: 10 }}>
                  <View style={styles.modalheading}>
                    <Text style={styles.modalText}>Lead Comments</Text>
                  </View>
                  {leadComments.length > 0 ? (
                    leadComments.map((comment, index) => (
                      <View key={index} style={styles.commentContainer}>
                        <Text style={styles.commentText}>
                          {comment.comment || 'No comment text'}
                        </Text>
                        <Text style={styles.modalText}>
                          Status: {comment.status || 'N/A'}
                        </Text>
                        <Text style={styles.modalText}>
                          Remind: {comment.remind || 'N/A'}
                        </Text>
                        <Text style={styles.modalText}>
                          Created Date: {comment.created_date || 'N/A'}
                        </Text>

                        {index !== leadComments.length - 1 && (
                          <View style={styles.separator} />
                        )}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.modalText}>No comments available</Text>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const editlead = item => {
    navigation.navigate('Update Lead', { leadid: item.id, status: item.status });
  };
  
  const LeadItem = ({ item, index }) => {
    return (
<Pressable>
<View style={styles.leadContainer}>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    {/* <Pressable style={styles.editButton} onPress={() => leadedit(item)}>
      <Text style={styles.editButtonText}>Lead Edit</Text>
    </Pressable> */}
    <Pressable style={styles.editButton1} onPress={() => openModal(item)}>
      <Text style={styles.editButtonText1}>{item.status}</Text>
    </Pressable>
  </View>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      <View style={styles.profileContainer}></View>
      <View style={{marginLeft: 10}}>
        <Text style={styles.leadTitle}>{item.name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.leadInfo}>{item.phone}</Text>
          <TouchableOpacity onPress={() => handlePhonePress(item.phone)}>
            <View style={{marginLeft: 10}}>
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
  <View style={{marginTop: 10}}>
    <Text style={styles.leadInfo1}>Lead ID: {item.id}</Text>
    <Text style={styles.leadInfo1}>Source: {item.source}</Text>
    <Text style={styles.leadInfo1}>Comments: {item.notes || 'N/A'}</Text>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={styles.leadInfo1}>
        Date: {moment(item.lead_date).format('YYYY-MM-DD')}
      </Text>
    </View>
  </View>
</View>
</Pressable>
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
          <Text
            style={[
              styles.text,
              activeButton === 'All' && { color: '#625bc5' },
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Team' && { backgroundColor: '#ddf' },
          ]}
          onPress={() => onPressButton('Team')}
        >
          <Text
            style={[
              styles.text,
              activeButton === 'Team' && { color: '#625bc5' },
            ]}
          >
            Team
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Self' && { backgroundColor: '#ddf' },
          ]}
          onPress={() => onPressButton('Self')}
        >
          <Text
            style={[
              styles.text,
              activeButton === 'Self' && { color: '#625bc5' },
            ]}
          >
            Self
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.Button} style={styles.loader} />
      ) : (
        <FlatList
          data={leadData}
          renderItem={LeadItem}
          keyExtractor={item => item.lead_id ? item.lead_id.toString() : Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

{selectedItem && <LeadModal item={selectedItem} />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#625bc5',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
  leadContainer: {
    padding: 10,
    borderRadius: 6,
    borderColor: '#ede8e8',
    borderWidth: 1,
    backgroundColor: '#ede8e8',
    marginBottom: 10,
  },
  editButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#625bc5',
    padding: 5,
    borderRadius: 4,
  },
  editButton1: {
    alignSelf: 'flex-start',
    backgroundColor: '#625bc5',
    padding: 5,
    borderRadius: 4,
  },
  editButtonText1: {
    color: '#fff',
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
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
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
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalBackground: {
    backgroundColor: 'transparent', // Make sure this is transparent
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
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
    height: '30%',
    padding: 10,
  },
});

export default Visitdone;
