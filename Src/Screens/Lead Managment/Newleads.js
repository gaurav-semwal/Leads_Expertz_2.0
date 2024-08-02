import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Get_Lead } from '../../../Api/authApi';
import { Colors } from '../../Comman/Styles';
import moment from 'moment';

const Newlead = () => {
  const [activeButton, setActiveButton] = useState('All');
  const [leadData, setLeadData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, [activeButton]);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await Get_Lead();
      if (response.msg === 'Load successfully') {
        console.log("HI THERE CHECKING NEW LEAD", response);
        const filteredLeads = response.data?.filter(lead => lead.status === 'NEW LEAD') || [];
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
  const getBackgroundColor = (index) => {
    const colors = ['#f9f9f9', '#e0f7fa', '#e1bee7', '#fff9c4'];
    return colors[index % colors.length];
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
    {/* <Pressable onPress={() => editlead(item)}>
      <AntDesign name="edit" size={25} color="black" />
    </Pressable> */}
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
});

export default Newlead;
