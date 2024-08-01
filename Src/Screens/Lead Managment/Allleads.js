import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, FlatList, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';
import { Get_Lead, Get_Lead_Data, Get_Status } from '../../../Api/authApi';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';

const Allleads = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [status, setstatus] = useState('');
  const [dob, setdob] = useState();
  const [doa, setdoa] = useState();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatedob, setSelectedDatedob] = useState('');
  const [leadData, setLeadData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    getlead();
    getstatus();
  }, []);

  const getstatus = async () => {
    try {
      const response = await Get_Status();
      console.log('sttus', response);
      if (response.msg === '') {
        setStatusData(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getlead = async () => {
    try {
      const response = await Get_Lead();
      console.log(response);
      if (response.msg === 'Load successfully') {
        setLeadData(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addleads = () => {
    setShowCalendarModal(true);
  };

  const addleadsdob = () => {
    setShowCalendar(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  
  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setShowCalendarModal(false);

    if (date) {
        setSelectedDate(date);
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    }
};

  const handleDateSelectdob = async (date) => {
    setSelectedDatedob(date);
    setShowCalendar(false);

    if (date) {
        setSelectedDatedob(date);
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    }
};

  const leadedit = (item) => {
    console.log('Edit lead:', item);
  };

  const openModal = async (item) => {
    setModalVisible(true);
    try {
      const response = await Get_Lead_Data(item.id);
      console.log(response)
      if (response.msg === "Load successfully") {
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

  const handlePhonePress = (phone) => {
    console.log('Phone press:', phone);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const editlead = (item) => {
    console.log('Edit lead:', item);
    navigation.navigate('Update Lead', { leadid: item.id ,status:item.status});
  };

  const Item = ({ item }) => (
    <Pressable>
      <View style={styles.leadContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable style={styles.editButton} onPress={() => leadedit(item)}>
            <Text style={styles.editButtonText}>Lead Edit</Text>
          </Pressable>
          <Pressable style={styles.editButton1} onPress={() => openModal(item)}>
            <Text style={styles.editButtonText1}>{item.status}</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={styles.profileContainer}>
              {/* <Image style={styles.profileImage} source={require('../Assets/Images/profile.jpg')} /> */}
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.leadTitle}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.leadInfo}>{item.phone}</Text>
                <TouchableOpacity onPress={() => handlePhonePress(item.phone)}>
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
          <Text style={styles.leadInfo1}>Comments: {item.notes || 'N/A'}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.leadInfo1}>Date: {moment(item.lead_date).format('YYYY-MM-DD')}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const LeadModal = ({ item }) => {
    if (!item) return null;

    const leadComments = item.lead_comment || [];

    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <Pressable style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Lead Details</Text>
                <Pressable onPress={closeModal}>
                  <MaterialCommunityIcons name="close-circle" size={25} color="#625bc5" />
                </Pressable>
              </View>

              <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text style={styles.modalText}>Name: {item.name || 'N/A'}</Text>
                <Text style={styles.modalText}>Email: {item.email || 'N/A'}</Text>
                <Text style={styles.modalText}>Mobile: {item.phone || 'N/A'}</Text>
                <Text style={styles.modalText}>Address: {item.field3 || 'N/A'}</Text>
                <Text style={styles.modalText}>DOB: {item.app_dob || 'N/A'}</Text>
                <Text style={styles.modalText}>DOA: {item.app_doa || 'N/A'}</Text>
                <Text style={styles.modalText}>Source: {item.source || 'N/A'}</Text>
                <Text style={styles.modalText}>Type: {item.type || 'N/A'}</Text>
                <Text style={styles.modalText}>Category: {item.cat_name || 'N/A'}</Text>
                <Text style={styles.modalText}>SubCategory: {item.subcatname || 'N/A'}</Text>
                <Text style={styles.modalText}>State: {item.field1 || 'N/A'}</Text>
                <Text style={styles.modalText}>City: {item.field2 || 'N/A'}</Text>
                <Text style={styles.modalText}>Classification: {item.classification || 'N/A'}</Text>
                <Text style={styles.modalText}>Project: {item.project_id || 'N/A'}</Text>
                <Text style={styles.modalText}>Campaign: {item.campaign || 'N/A'}</Text>
                <Text style={styles.modalText}>Status: {item.status || 'N/A'}</Text>
              </View>

              <View style={{ height: '30%', padding: 10 }}>
                <ScrollView>
                  <View style={styles.modalheading}>
                    <Text style={styles.modalText}>Lead Comments</Text>
                  </View>
                  {leadComments.length > 0 ? (
                    leadComments.map((comment, index) => (
                      <View key={index} style={styles.commentContainer}>
                        <Text style={styles.commentText}>{comment.comment || 'No comment text'}</Text>
                        <Text style={styles.modalText}>Status: {comment.status || 'N/A'}</Text>
                        <Text style={styles.modalText}>Remind: {comment.remind || 'N/A'}</Text>
                        <Text style={styles.modalText}>Created Date: {comment.created_date || 'N/A'}</Text>
                        {index !== leadComments.length - 1 && <View style={styles.separator} />}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.modalText}>No comments available</Text>
                  )}
                </ScrollView>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <View style={{ width: '49%' }}>
            <Text>From</Text>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Select User" value="" />
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Self" value="Self" />
                <Picker.Item label="Team" value="Team" />
              </Picker>
            </View>
          </View>

          <View style={{ width: '49%' }}>
            <Text>Status</Text>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setstatus(itemValue)}
              >
                <Picker.Item label="Select Status" value="" />
                {statusData.map(statusItem => (
                  <Picker.Item key={statusItem.id} label={statusItem.name} value={statusItem.name} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.dob}>
          <View style={{ width: '49%' }}>
            <View>
              <TextInput
                label="Date"
                value={selectedDatedob ? moment(selectedDatedob).format('YYYY-MM-DD') : ''}
                onChangeText={(text) => setdob(text)}
                style={[styles.textinputdob, {}]}
                mode="outlined"
                maxLength={10}
              />
              <Pressable
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 16,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={addleadsdob}>
                <AntDesign name="calendar" color="#625bc5" size={25} />
              </Pressable>
            </View>
          </View>

          <View style={{ width: '49%' }}>
            <TextInput
              label="To"
              value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : ''}
              onChangeText={(text) => setdoa(text)}
              style={[styles.textinputdob, {}]}
              mode="outlined"
              maxLength={10}
              editable={false}
            />
            <Pressable
              style={{
                position: 'absolute',
                top: 10,
                right: 16,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={addleads}>
              <AntDesign name="calendar" color="#625bc5" size={25} />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity style={styles.buttoncontainer1}>
          <Text style={styles.text1}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={leadData}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      {selectedItem && <LeadModal item={selectedItem} />}

      <Modal
                animationType="slide"
                transparent={true}
                visible={showCalendar}
                onRequestClose={() => setShowCalendar(false)}>
                <View style={{ flex: 1, justifyContent: 'center' }}>


                    <Calendar
                        onDayPress={(day) => handleDateSelectdob(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: 'blue' }
                        }}
                    />
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showCalendarModal}
                onRequestClose={() => setShowCalendarModal(false)}>
                <View style={{ flex: 1, justifyContent: 'center' }}>


                    <Calendar
                        onDayPress={(day) => handleDateSelect(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: 'blue' }
                        }}
                    />
                </View>
            </Modal>
    </View>
  );
};

export default Allleads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
    marginTop: 6,
  },
  dob: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%'
  },
  buttoncontainer1: {
    height: 38,
    width: '40%',
    borderRadius: 10,
    backgroundColor: '#625bc5',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10
  },
  text1: {
    color: 'white',
  },
  textinputdob: {
  },
  top: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  pageButton: {
    marginHorizontal: 10,
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#625bc5',
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    width: '90%',
    padding: 10,
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
    padding: 10
  },
});