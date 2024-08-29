import React, { useState, useEffect,useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView,   RefreshControl} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import moment from 'moment';
import HomeScheduletable from './HomeScheduletable';
import { Get_Birthday } from '../../Api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Homescreentable = () => {
  const [activeButton, setActiveButton] = useState('Upcoming Birthday');
  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [widthArr] = useState([120, 150, 150, 150, 150]);
  const [role, setRole] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getBirthday();
    }, []),
  );

  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };
    getRole();
  }, []);

  const getBirthday = async () => {
    try {
      const response = await Get_Birthday();
      console.log('resssss', response);
  
      if (response.msg === '') {
        const currentMonth = moment().month(); 
        const currentYear = moment().year(); 
  
        const filteredData = response.data.filter(item => {
          const dobIsCurrentMonthAndYear =
            item.app_dob && moment(item.app_dob).month() === currentMonth && moment(item.app_dob).year() === currentYear;
          const doaIsCurrentMonthAndYear =
            item.app_doa && moment(item.app_doa).month() === currentMonth && moment(item.app_doa).year() === currentYear;
  
          return dobIsCurrentMonthAndYear || doaIsCurrentMonthAndYear;
        });
  
        setAllData(filteredData);
      }
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const filterData = (data, type) => {
    const today = moment();
    const upcomingRange = 15; // 15 days range

    const filteredData = data.filter(item => {
      const itemDate = moment(type === 'Upcoming Birthday' ? item.app_dob : item.app_doa);
      const isUpcoming = itemDate.isBetween(today, today.clone().add(upcomingRange, 'days'), 'day', '[]');
      return (
        (type === 'Upcoming Birthday' && isUpcoming && item.type === 'Birthday') ||
        (type === 'Upcoming Anniversary' && isUpcoming && item.type === 'Anniversary')
      );
    });

    setTableData(filteredData);
  };

  const onPressButton = (type) => {
    setActiveButton(type);
    filterData(allData, type);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getDashboard();
  };

  const renderTableRows = () => {
    return allData
      .filter(rowData => {
        if (activeButton === 'Upcoming Birthday') {
          return rowData.app_dob && rowData.app_dob !== 'N/A';
        } else {
          return rowData.app_doa && rowData.app_doa !== 'N/A';
        }
      })
      .map((rowData, index) => (
        <Row
          key={index}
          data={[
            rowData.agent || 'N/A',
            rowData.name || 'N/A',
            rowData.phone || 'N/A',
            rowData.app_city || 'N/A',
            activeButton === 'Upcoming Birthday' ? rowData.app_dob : rowData.app_doa,
          ]}
          widthArr={widthArr}
          style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
          textStyle={styles.text}
        />
      ));
  };

  return (
    <View style={styles.container}>
      <HomeScheduletable />

      {['team_manager', 'salesman', 'telecaller'].includes(role) && (
<>
    
          {['team_manager', 'salesman', 'telecaller'].includes(role) && (
            <View style={styles.body}>
              <Pressable
                style={[styles.button, activeButton === 'Upcoming Birthday' && { backgroundColor: '#ddf' }]}
                onPress={() => onPressButton('Upcoming Birthday')}
              >
                <Text style={[styles.text, activeButton === 'Upcoming Birthday' && { color: '#625bc5' }]}>Upcoming Birthday</Text>
              </Pressable>
              <Pressable
                style={[styles.button, activeButton === 'Upcoming Anniversary' && { backgroundColor: '#ddf' }]}
                onPress={() => onPressButton('Upcoming Anniversary')}
              >
                <Text style={[styles.text, activeButton === 'Upcoming Anniversary' && { color: '#625bc5' }]}>Upcoming Anniversary</Text>
              </Pressable>
            </View>
          )}

          <ScrollView horizontal  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            {['team_manager', 'salesman', 'telecaller'].includes(role) && (
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <Row
                    data={['Agent Name', 'Applicant Name', 'App. Contact', 'App. City', activeButton === 'Upcoming Birthday' ? 'Birthday' : 'Anniversary']}
                    widthArr={widthArr}
                    style={styles.header}
                    textStyle={[styles.text, { color: '#FFFFFF' }]}
                  />
                  {renderTableRows()}
                </Table>
              </View>
            )}
          </ScrollView>
      </>
    )}
    <View style={{height:100}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#625bc5',
    width: '48%',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#e6ebf5',
    marginVertical: 10,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 6,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
  header: {
    height: 50,
    backgroundColor: '#625bc5',
  },
});

export default Homescreentable;
