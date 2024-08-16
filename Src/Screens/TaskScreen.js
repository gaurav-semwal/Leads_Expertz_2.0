import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Components/Button';
import {Add_Task, Get_Task} from '../../Api/authApi';
import Toast from 'react-native-toast-message';

const Taskscreen = () => {
  const [activeButton, setActiveButton] = useState('All');
  const [taskmodal, setTaskModal] = useState(false);
  const [updateModal, setUpdateModal] = useState({
    visible: false,
    id: null,
    update: '',
  });
  const [taskData, setTaskData] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await Get_Task();
      console.log('GETTING THE TASK DATA', response);

      if (response && response.data) {
        setTaskData(response.data);
      } else {
        setTaskData([]);
        Toast.show({
          text1: response.msg,
          type: 'error',
          position: 'bottom', 
        });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTaskData([]);
    }
  };

  const addTask = async () => {
    try {
      const response = await Add_Task(newTask);
      console.log('CHECKING THE TASK, WHETHER IT IS ADDING OR NOT', response);
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
        console.log('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  const onPressPlusButton = () => {
    setTaskModal(true);
  };

  const onPressUpdateButton = id => {
    console.log(id);
    setUpdateModal({visible: true, id: id, update: ''});
  };

  const handleCloseModalPassword = () => {
    setTaskModal(false);
  };

  const handleCloseModalUpdate = () => {
    setUpdateModal({...updateModal, visible: false});
  };

  const renderTasks = () => {
    const filteredTasks =
      activeButton === 'All'
        ? taskData
        : taskData.filter(task => task.status === activeButton);

    if (!filteredTasks || filteredTasks.length === 0) {
      return <Text>No tasks found.</Text>;
    }

    return filteredTasks.map(task => (
      <View key={task.id} style={styles.taskContainer}>
        <Text style={styles.taskText}>User: {task.username}</Text>
        <Text style={styles.taskText}>Status: {task.status}</Text>
        <Text style={styles.taskText}>Task: {task.task}</Text>
        <Text style={styles.taskDate}>Date: {task.created_at}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>{renderTasks()}</ScrollView>

      <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
        <AntDesign name="plus" size={28} color="#dbdad3" />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={taskmodal}
        onRequestClose={handleCloseModalPassword}>
        <View style={[styles.centeredView, {justifyContent: 'flex-end'}]}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Add Task</Text>
              <Pressable onPress={handleCloseModalPassword}>
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
              <Pressable onPress={addTask} style={{marginTop: 15}}>
                <Button text="Add Task" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModal.visible}
        onRequestClose={handleCloseModalUpdate}>
        <View style={[styles.centeredView, {justifyContent: 'flex-end'}]}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Update Task</Text>
              <Pressable onPress={handleCloseModalUpdate}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={25}
                  color="#625bc5"
                />
              </Pressable>
            </View>

            <View style={styles.modalContent}>
              <TextInput
                placeholder="Enter Updated Task"
                value={updateModal.update}
                onChangeText={text =>
                  setUpdateModal({...updateModal, update: text})
                }
                style={styles.textinput}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Taskscreen;

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
    height: '28%',
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
  },
  taskContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
});