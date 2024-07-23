import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../Comman/Styles';
import { Divider, Provider, DataTable, Text, Button } from 'react-native-paper';

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
        <View style={styles.buttonRow}>
          <Button
            mode={selectedButton === 'all' ? 'contained' : 'outlined'}
            onPress={() => setSelectedButton('all')}
            style={[styles.button, selectedButton === 'all' && styles.selectedButton]}
          >
            All
          </Button>
          <Button
            mode={selectedButton === 'team' ? 'contained' : 'outlined'}
            onPress={() => setSelectedButton('team')}
            style={[styles.button, selectedButton === 'team' && styles.selectedButton]}
          >
            Team
          </Button>
          <Button
            mode={selectedButton === 'self' ? 'contained' : 'outlined'}
            onPress={() => setSelectedButton('self')}
            style={[styles.button, selectedButton === 'self' && styles.selectedButton]}
          >
            Self
          </Button>
        </View>
        <Divider style={styles.divider} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>S.No</DataTable.Title>
            <DataTable.Title>Lead ID</DataTable.Title>
            <DataTable.Title>Agent Name</DataTable.Title>
            <DataTable.Title>Source</DataTable.Title>
            <DataTable.Title>Campaign</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>City</DataTable.Title>
            <DataTable.Title>Classification</DataTable.Title>
            <DataTable.Title>Lead Date</DataTable.Title>
            <DataTable.Title>Followup Date</DataTable.Title>
            <DataTable.Title>Last Comment</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>No data available in table</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
    </Provider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
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