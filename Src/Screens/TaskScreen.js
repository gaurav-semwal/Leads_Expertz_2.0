import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Components/Button';
import { Add_Task, Get_Task, Update_Task } from '../../Api/authApi';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

const Taskscreen = () => {
  const [activeButton, setActiveButton] = useState('All');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [updateModal, setUpdateModal] = useState({
    visible: false,
    id: null,
    update: '',
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await Get_Task();
      if (response && response.data) {
        setTaskData(response.data);
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Toast.show({
        text1: 'Error fetching tasks',
        type: 'error',
        position: 'bottom',
      });
    }
  };

  const updateTask = async () => {
    try {
      const response = await Update_Task(updateModal.id, updateModal.update);
      console.log('CHECKING THE UPDATED TASK', response);
      if (response.msg === 'Save successfully.') {
        setUpdateModal({ ...updateModal, visible: false });
        fetchTasks();
        Toast.show({
          text1: response.msg,
          type: 'success',
        });
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      Toast.show({
        text1: 'Error updating task',
        type: 'error',
      });
    }
  };

  const addTask = async () => {
    try {
      const response = await Add_Task(newTask);
      if (response.msg === 'Task created successfully.') {
        setTaskModal(false);
        fetchTasks();
        setNewTask('');
        Toast.show({
          text1: response.msg,
          type: 'success',
          position: 'top',
        });
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Error adding task:', error);
      Toast.show({
        text1: 'Error adding task',
        type: 'error',
        position: 'top',
      });
    }
  };

  const onPressPlusButton = () => {
    setTaskModal(true);
  };

  const onPressUpdateButton = id => {
    setUpdateModal({ visible: true, id, update: '' });
  };

  const handleCloseModal = () => {
    setTaskModal(false);
    setUpdateModal({ ...updateModal, visible: false });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(false);
    setFromDate(currentDate);
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(false);
    setToDate(currentDate);
  };

  const formatDate = date => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = date => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderTasks = () => {
    const filteredTasks =
      activeButton === 'All'
        ? taskData
        : taskData.filter(task => task.status === activeButton);

    if (!filteredTasks.length) {
      return <Text>No tasks found.</Text>;
    }

    return filteredTasks.map(task => (
      <View key={task.id} style={styles.taskContainer}>
        <Text style={styles.taskText}>User: {task.username}</Text>
        <Text style={styles.taskText}>Status: {task.status}</Text>
        <Text style={styles.taskText}>Task: {task.task}</Text>
        <Text style={styles.taskDate}>Date: {task.created_at}</Text>
        <TouchableOpacity onPress={() => onPressUpdateButton(task.id)}>
          <AntDesign name="edit" size={28} color="#625bc5" />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>{renderTasks()}</ScrollView>

        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={28} color="#dbdad3" />
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={taskModal}
          onRequestClose={handleCloseModal}>
          <View style={[styles.centeredView, { justifyContent: 'flex-end' }]}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Add Task</Text>
                <Pressable onPress={handleCloseModal}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={30}
                    color="#625bc5"
                  />
                </Pressable>
              </View>

              <View style={styles.modalContent}>
                <TextInput
                  placeholder="Enter Task"
                  value={newTask}
                  onChangeText={text => setNewTask(text)}
                  style={styles.textinput}
                />

                <View style={styles.row}>
                  <View style={styles.datePickerContainer}>
                    <TouchableOpacity
                      style={styles.datePicker}
                      onPress={() => setShowFromDatePicker(true)}>
                      <Text>{formatDate(fromDate)}</Text>
                      <AntDesign name="calendar" color="#625bc5" size={24} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.datePickerContainer}>
                    <TouchableOpacity
                      style={styles.datePicker}
                      onPress={() => setShowToDatePicker(true)}>
                      <Text>{formatTime(toDate)}</Text>
                      <AntDesign name="clockcircleo" color="#625bc5" size={24} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Pressable onPress={addTask} style={{ marginTop: 15 }}>
                  <Button text="Add Task" />
                </Pressable>
              </View>
            </View>
          </View>

          {showFromDatePicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              onChange={handleDateChange}
            />
          )}

          {showToDatePicker && (
            <DateTimePicker
              value={toDate}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={updateModal.visible}
          onRequestClose={handleCloseModal}>
          <View style={[styles.centeredView, { justifyContent: 'flex-end' }]}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={styles.modalText}>Update Task</Text>
                <Pressable onPress={handleCloseModal}>
                  <MaterialCommunityIcons name="close-circle" size={25} color="#625bc5" />
                </Pressable>
              </View>

              <View style={{ flexDirection: 'column', width: '90%' }}>
                <TextInput
                  placeholder="Enter Updated Task"
                  value={updateModal.update}
                  onChangeText={text => setUpdateModal({ ...updateModal, update: text })}
                  style={styles.textinput}
                >
                </TextInput>
                 <FontAwesome name="microphone" size={25} color="#625bc5" />
                <Pressable onPress={updateTask} style={{ marginTop: 15 }}>
                  <Button text="Update Task" />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#625bc5',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#f2f2f2',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
    height: '36%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContent: {
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'space-between',
  },
  textinput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#625bc5',
    paddingLeft: 20,
    marginVertical: 5,
  },
  taskContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  datePickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '102%',
  },
  datePicker: {
    borderRadius: 10,
    borderColor: '#625bc5',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Taskscreen;
