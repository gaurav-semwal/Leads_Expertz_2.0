import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Table, Row } from 'react-native-table-component';
import { Colors } from '../Comman/Styles';
import { Divider, Provider, DataTable, Text, Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SmartLeadSegmentation = () => {
  const [source, setSource] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [classification, setClassification] = useState('');
  const [project, setProject] = useState('');
  const [campaigns, setCampaigns] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('');
  const [owner, setOwner] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);

  const [activeButton, setActiveButton] = useState('All');
  const [callScheduleData, setCallScheduleData] = useState([
      { id: 1, sno: 1, name: 'John Doe', campaign: 'Campaign A', source: 'Medium', status: 'In Progress', city: 'hydrabad', classification: 'High', leadDate: '2023-01-01', followupDate: '2023-01-02', lastcomment: 'Lorem ipsum', action: 'action' },
      { id: 2, sno: 2, name: 'Alice Smith', campaign: 'Campaign B', source: 'Low', status: 'In Progress', city: 'mumbai', classification: 'Medium', leadDate: '2023-01-02', followupDate: '2023-01-03', lastcomment: 'Dolor sit amet', action: 'action' },
      // Add more dummy data as needed
  ]);
  const [visitScheduleData, setVisitScheduleData] = useState([
      { id: 1, sno: 1, name: 'Bob Brown', campaign: 'Campaign C', source: 'High', status: 'Completed', city: 'chennai', classification: 'Low', leadDate: '2023-01-03', followupDate: '2023-01-04', lastcomment: 'Consectetur adipiscing elit', action: 'action' },
      { id: 2, sno: 2, name: 'Emily Johnson', campaign: 'Campaign D', source: 'High', status: 'Completed', city: 'chennai', classification: 'High', leadDate: '2023-01-04', followupDate: '2023-01-05', lastcomment: 'Sed do eiusmod tempor', action: 'action' },
      // Add more dummy data as needed
  ]);
  const [missedFollowUpData, setMissedFollowUpData] = useState([
      { id: 1, sno: 1, name: 'David Lee', campaign: 'Campaign E', source: 'Low', status: 'Cancelled', city: 'delhi', classification: 'Medium', leadDate: '2023-01-05', followupDate: '2023-01-06', lastcomment: 'Ut labore et dolore magna', action: 'action' },
      { id: 2, sno: 2, name: 'Sarah Clark', campaign: 'Campaign F', source: 'Medium', status: 'In Progress', city: 'hydrabad', classification: 'High', leadDate: '2023-01-06', followupDate: '2023-01-07', lastcomment: 'Ut enim ad minim veniam', action: 'action' },
      // Add more dummy data as needed
  ]);
  const [tableHead] = useState(['S.No', 'Lead ID', 'Agent Name', 'Source', 'Campaign', 'Status', 'Name', 'City', 'Classification', 'Lead Date', 'Followup Date', 'Last Comment', 'Action']);
  const [widthArr] = useState([50, 80, 80, 60, 100, 100, 100, 100, 100, 100, 150, 150, 100]);
  const [tableData, setTableData] = useState(callScheduleData);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPressButton = (type) => {
      setActiveButton(type);
      setCurrentPage(1);
      switch (type) {
          case 'All':
              setTableData([
                  ...callScheduleData,
                  ...visitScheduleData,
                  ...missedFollowUpData
              ]);
              break;
          case 'Team':
              setTableData(visitScheduleData);
              break;
          case 'Self':
              setTableData(missedFollowUpData);
              break;
          default:
              setTableData(callScheduleData);
      }
  };

  const leadedit = (rowData) => {
      navigation.navigate('leadupdate', { leadid: rowData.id, status: rowData.status });
  };

  const renderTableRows = () => {
      let dataToDisplay = tableData;

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      return Array.isArray(dataToDisplay) && dataToDisplay.slice(startIndex, endIndex).map((rowData, index) => (
          <Row
              key={startIndex + index}
              data={[
                  rowData.sno.toString(),
                  rowData.id.toString(),
                  rowData.name,
                  rowData.source,
                  rowData.campaign,
                  rowData.status,
                  rowData.name,
                  rowData.city,
                  rowData.classification,
                  rowData.leadDate,
                  rowData.followupDate,
                  rowData.lastcomment,
                  rowData.action
              ]}
              widthArr={widthArr}
              style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
              textStyle={styles.text}
          />
      ));
  };

  const renderPagination = () => {
      const totalPages = Math.ceil(tableData.length / itemsPerPage);

      return (
          <View style={styles.pagination}>
              <TouchableOpacity
                  style={styles.pageButton}
                  disabled={currentPage === 1}
                  onPress={() => setCurrentPage(currentPage - 1)}
              >
                  <AntDesign name="left" color="#625bc5" size={25} />
              </TouchableOpacity>
              <Text style={styles.pageText}>{currentPage} / {totalPages}</Text>
              <TouchableOpacity
                  style={styles.pageButton}
                  disabled={currentPage === totalPages}
                  onPress={() => setCurrentPage(currentPage + 1)}
              >
                  <AntDesign name="right" color="#625bc5" size={25} />
              </TouchableOpacity>
          </View>
      );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={source}
          style={styles.picker}
          onValueChange={(itemValue) => setSource(itemValue)}>
          <Picker.Item label="Select Source" value="" />
          <Picker.Item label="Source 1" value="Source 1" />
          <Picker.Item label="Source 2" value="Source 2" />
          <Picker.Item label="Source 3" value="Source 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          style={styles.picker}
          onValueChange={(itemValue) => setType(itemValue)}>
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Type 1" value="Type 1" />
          <Picker.Item label="Type 2" value="Type 2" />
          <Picker.Item label="Type 3" value="Type 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Category 1" value="Category 1" />
          <Picker.Item label="Category 2" value="Category 2" />
          <Picker.Item label="Category 3" value="Category 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={subCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSubCategory(itemValue)}>
          <Picker.Item label="Select Sub Category" value="" />
          <Picker.Item label="Sub Category 1" value="Sub Category 1" />
          <Picker.Item label="Sub Category 2" value="Sub Category 2" />
          <Picker.Item label="Sub Category 3" value="Sub Category 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={classification}
          style={styles.picker}
          onValueChange={(itemValue) => setClassification(itemValue)}>
          <Picker.Item label="Select Classification" value="" />
          <Picker.Item label="Classification 1" value="Classification 1" />
          <Picker.Item label="Classification 2" value="Classification 2" />
          <Picker.Item label="Classification 3" value="Classification 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={project}
          style={styles.picker}
          onValueChange={(itemValue) => setProject(itemValue)}>
          <Picker.Item label="Select Project" value="" />
          <Picker.Item label="Project 1" value="Project 1" />
          <Picker.Item label="Project 2" value="Project 2" />
          <Picker.Item label="Project 3" value="Project 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={campaigns}
          style={styles.picker}
          onValueChange={(itemValue) => setCampaigns(itemValue)}>
          <Picker.Item label="Select Campaigns" value="" />
          <Picker.Item label="Campaigns 1" value="Campaigns 1" />
          <Picker.Item label="Campaigns 2" value="Campaigns 2" />
          <Picker.Item label="Campaigns 3" value="Campaigns 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={state}
          style={styles.picker}
          onValueChange={(itemValue) => setState(itemValue)}>
          <Picker.Item label="Select State" value="" />
          <Picker.Item label="State 1" value="State 1" />
          <Picker.Item label="State 2" value="State 2" />
          <Picker.Item label="State 3" value="State 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={city}
          style={styles.picker}
          onValueChange={(itemValue) => setCity(itemValue)}>
          <Picker.Item label="Select City" value="" />
          <Picker.Item label="City 1" value="City 1" />
          <Picker.Item label="City 2" value="City 2" />
          <Picker.Item label="City 3" value="City 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={budget}
          style={styles.picker}
          onValueChange={(itemValue) => setBudget(itemValue)}>
          <Picker.Item label="Select Budget" value="" />
          <Picker.Item label="Budget 1" value="Budget 1" />
          <Picker.Item label="Budget 2" value="Budget 2" />
          <Picker.Item label="Budget 3" value="Budget 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={(itemValue) => setStatus(itemValue)}>
          <Picker.Item label="Select Status" value="" />
          <Picker.Item label="Status 1" value="Status 1" />
          <Picker.Item label="Status 2" value="Status 2" />
          <Picker.Item label="Status 3" value="Status 3" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={owner}
          style={styles.picker}
          onValueChange={(itemValue) => setOwner(itemValue)}>
          <Picker.Item label="Select Owner" value="" />
          <Picker.Item label="Owner 1" value="Owner 1" />
          <Picker.Item label="Owner 2" value="Owner 2" />
          <Picker.Item label="Owner 3" value="Owner 3" />
        </Picker>
      </View>
      <Provider>

        <Button mode="contained" onPress={() => console.log('Search pressed')} style={styles.searchButton}>
          Search
        </Button>
        <Divider style={styles.divider} />
        <Text style={styles.title}>Leads Data - (FUTURE LEAD)</Text>
        <View style={styles.body}>
                <Pressable
                    style={[
                        styles.button1,
                        activeButton === 'All' && { backgroundColor: '#ddf' },
                    ]}
                    onPress={() => onPressButton('All')}
                >
                    <Text style={[styles.text, activeButton === 'All' && { color: '#625bc5' }]}>All</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button1,
                        activeButton === 'Team' && { backgroundColor: '#ddf' }
                    ]}
                    onPress={() => onPressButton('Team')}
                >
                    <Text style={[styles.text, activeButton === 'Team' && { color: '#625bc5' }]}>Team</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button1,
                        activeButton === 'Self' && { backgroundColor: '#ddf' }
                    ]}
                    onPress={() => onPressButton('Self')}
                >
                    <Text style={[styles.text, activeButton === 'Self' && { color: '#625bc5' }]}>Self</Text>
                </Pressable>
            </View>
            <View>
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row
                                data={tableHead}
                                widthArr={widthArr}
                                style={styles.header}
                                textStyle={[styles.text, { color: '#FFFFFF' }]}
                            />
                            {renderTableRows()}
                        </Table>
                    </View>
                </ScrollView>
                {renderPagination()}
            </View>
    </Provider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
},
row: {
    height: 40,
    backgroundColor: '#E7E6E1'
},
pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
},
pageButton: {
    marginHorizontal: 5
},
pageText: {
    color: '#625bc5',
    fontWeight: 'bold'
},
button1: {
  borderWidth: 1,
  borderColor: Colors.Button,
  width: '30%',
  alignItems: 'center',
  height: 40,
  justifyContent: 'center',
  borderRadius: 10,
  backgroundColor: '#e6ebf5',
},
body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
},
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 6,
  },
  picker: {
    height: 50,
  },
  searchButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  divider: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SmartLeadSegmentation;