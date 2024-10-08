import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Comman/Styles';
import { TextInput } from 'react-native-paper';
import Button from '../../Src/Components/Button';
import Toast from 'react-native-toast-message';
import validator from 'validator';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {
  Update_Lead,
  Get_Campaigns,
  Get_Category,
  Get_City,
  Get_Project,
  Get_Source,
  Get_State,
  Get_Sub_Category,
  Get_Lead_Data,
  Get_Status,
} from '../../Api/authApi';
import { useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const Updatelead = ({ navigation }) => {
  const route = useRoute();
  const { leadid } = route.params;

  const [mobilenumner, setmobilenumber] = useState('');
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [source, setsource] = useState([]);
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedtype, setselectedtype] = useState('');
  const [category, setCategory] = useState([]);
  const [project, setproject] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedproject, setselectedproject] = useState('');
  const [campigns, setcampigns] = useState([]);
  const [selectedcampigns, setselectedcampigns] = useState('');
  const [city, setcity] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [cityfuture, setcityfuture] = useState([]);
  const [statesfuture, setStatesfuture] = useState([]);
  const [selectedStatefuture, setSelectedStatefuture] = useState('');
  const [selectedCityfuture, setSelectedCityfuture] = useState('');
  const [selectedclassification, setselectedclassification] = useState('');
  const [comments, setcomments] = useState('');
  const [address, setaddress] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');
  const [statusData, setStatusData] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantContact, setApplicantContact] = useState('');
  const [applicantCity, setApplicantCity] = useState('');
  const [applicantDob, setApplicantDob] = useState('');
  const [applicantDoa, setApplicantDoa] = useState('');
  const [dobOpen, setDobOpen] = useState(false);
  const [selectedApplicantDob, setSelectedApplicantDob] = useState(null);
  const [selectedApplicantDoa, setSelectedApplicantDoa] = useState(null);
  
  const [doaOpen, setDoaOpen] = useState(false);

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [showdobmodal, setshowdobmodal] = useState(false);
  const [showdoamodal, setshowdoamodal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  useEffect(() => {
    getstate();
    getstate1();
    gecategoryapi();
    getsource();
    getcampaigns();
    getproject();
    getlead();
    getstatus();
  }, []);

  const handleBudgetChange = value => {
    setSelectedBudget(value);
  };

  const addleads = () => {
    setShowCalendarModal(true);
  };

  const handleConfirmTime = (time) => {
    if (time) {
      setSelectedTime(time.toLocaleTimeString()); // Format time as needed
    }
    hideTimePicker();
  };

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

  const handleSourceChange = itemValue => {
    setSelectedSource(itemValue);
  };

  const handleclassificationChange = itemValue => {
    setselectedclassification(itemValue);
  };

  const handlecampignsChange = itemValue => {
    setselectedcampigns(itemValue);
  };

  const handleprojectChange = itemValue => {
    console.log(itemValue);
    setselectedproject(itemValue);
  };

  const handleEmailChange = text => {
    setemail(text);
    if (validator.isEmail(text)) {
      setError('');
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleStateChange = (itemValue, itemIndex) => {
    setSelectedState(itemValue);
    getcity(itemValue);
  };

  const handleStateChangefuture = (itemValue, itemIndex) => {
    setSelectedStatefuture(itemValue);
    getcity1(itemValue);
  };

  const handleCategory = (itemValue, itemIndex) => {
    setSelectedCategory(itemValue);
    getSubcategory(itemValue);
  };
  const handleSubcategoryChange = itemValue => {
    setSelectedSubcategory(itemValue);
  };

  const handletypeChange = itemValue => {
    setselectedtype(itemValue);
    gecategoryapi(itemValue);
  };

  const gecategoryapi = async typeId => {
    console.log(typeId);
    try {
      const response = await Get_Category(typeId);
      console.log('category', response);
      if (response.msg === 'Load successfully.') {
        setCategory(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getstate = async () => {
    try {
      const response = await Get_State();
      if (response.msg === '') {
        const stateData = response.data.map(item => item.state);
        setStates(stateData);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getstate1 = async () => {
    try {
      const response = await Get_State();
      if (response.msg === '') {
        const stateData = response.data.map(item => item.state);
        setStatesfuture(stateData);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]); // Format date as needed
    }
    // Hide the calendar modal
    setShowCalendarModal(false);
  };

  const handleDateSelectdob = async date => {
    setselectedApplicantDob(date);
    setshowdobmodal(false);

    if (date) {
      setselectedApplicantDob(date);
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    }
  };

  const handleDateSelectdoa = async date => {
    setselectedApplicantDoa(date);
    setshowdoamodal(false);

    if (date) {
      setselectedApplicantDoa(date);
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    }
  };

  const getcity = async itemValue => {
    try {
      const response = await Get_City(itemValue);
      console.log('CITY DEKH AARI HAI', response);
      if (response.msg === '') {
        setcity(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getcity1 = async itemValue => {
    try {
      const response = await Get_City(itemValue);
      console.log('CITY RESPONSE--->', response);
      if (response.msg === '') {
        setcityfuture(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getSubcategory = async category_id => {
    try {
      const response = await Get_Sub_Category(category_id);
      if (response.msg === 'Load successfully.') {
        setSubcategory(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getsource = async () => {
    try {
      const response = await Get_Source();
      console.log(response);
      if (response.msg === 'Load successfully.') {
        setsource(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getcampaigns = async () => {
    try {
      const response = await Get_Campaigns();
      if (response.msg === 'Load successfully.') {
        setcampigns(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: response.msg,
        type: 'error',
      });
    } finally {
    }
  };

  const getproject = async () => {
    try {
      const response = await Get_Project();
      if (response.msg === 'Load successfully.') {
        setproject(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: response.msg,
        type: 'error',
      });
    } finally {
    }
  };

  const getlead = async () => {
    try {
      const response = await Get_Lead_Data(leadid);
      console.log('GETTING LEAD DATA --->', response.data);
      if (response.msg === 'Unauthorized request') {
        navigation.navigate('Login');
      } else if (response.msg === 'Load successfully') {
        const leadData = response.data;
        setfullname(leadData.name || '');
        setmobilenumber(leadData.phone || '');
        setemail(leadData.email || '');
        setaddress(leadData.field3 || '');
        setwhatsapp(leadData.whatsapp_no || '');
        setSelectedSource(leadData.source || '');
        setSelectedState(leadData.field2 || '');
        setSelectedCity(leadData.field1 || '');
        setselectedclassification(leadData.classification || '');
        setselectedcampigns(leadData.campaign || '');
        setselectedproject(leadData.project_id || '');
        setselectedtype(leadData.type || '');
        setStatus(leadData.status || '');

        const lastComment =
          leadData.lead_comment.length > 0
            ? leadData.lead_comment[leadData.lead_comment.length - 1].comment
            : '';
        setcomments(lastComment || '');

        if (leadData.type) {
          const typeResponse = await Get_Category(leadData.type);
          setCategory(typeResponse.data);
          setSelectedCategory(leadData.catg_id || '');

          const subcategoryResponse = await Get_Sub_Category(leadData.catg_id);
          setSubcategory(subcategoryResponse.data);
          setSelectedSubcategory(leadData.sub_catg_id || '');
        }

        if (leadData.project_id) {
          const projectResponse = await Get_Project(leadData.project_id);
          console.log('hiiiiiiiiiii', projectResponse.data);
          setproject(projectResponse.data);
        }

        if (leadData.campaign) {
          const campaignsResponse = await Get_Campaigns();
          setcampigns(campaignsResponse.data);
        }

        if (leadData.field2) {
          const stateResponse = await Get_State();
          setStates(stateResponse.data.map(item => item.state));
          setSelectedState(leadData.field2 || '');
        }

        if (leadData.field1) {
          const cityResponse = await Get_City(leadData.field2);
          setcity(cityResponse.data);
          setSelectedCity(leadData.field1 || '');
        }
      } else {
        // Handle error or message here if needed
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Submit = async () => {
    const dobDate = new Date(selectedApplicantDob);
    const doaDate = new Date(selectedApplicantDoa);
    const submissionDate = new Date(selectedDate);

    const formattedDob = dobDate.toISOString().split('T')[0];
    const formattedDoa = doaDate.toISOString().split('T')[0];
    const formattedSubmissionDate = submissionDate.toISOString().split('T')[0];

    console.log(
     'source', selectedSource,
     selectedcampigns,
      selectedProject,
      size,
      price,
      applicantName,
      applicantContact,
      selectedCityfuture,
      formattedDob,
      formattedDoa,
    );

    const requiredFieldsByStatus = {
      INTERESTED: ['selectedDate', 'selectedTime'],
      'CALL SCHEDULED': ['selectedDate', 'selectedTime'],
      'VISIT SCHEDULED': ['selectedDate', 'selectedTime'],
      'FUTURE LEAD': ['selectedBudget', 'selectedclassification'],
      CONVERTED: {
        BOOKED: ['selectedclassification'],
        COMPLETED: [
          'selectedProject', 'size', 'price', 'applicantName', 'applicantContact',
          'selectedCityfuture','selectedStatefuture',
          'selectedSource', 'selectedcampigns', 'selectedCity', 'selectedState',
          'selectedclassification','selectedtype'
        ],
      },
    };

    const validateFields = () => {
      const commonRequiredFields = ['comments'];
      const statusSpecificRequiredFields = Array.isArray(requiredFieldsByStatus[status])
        ? requiredFieldsByStatus[status]
        : [];

      let additionalRequiredFields = [];

      if (status === 'CONVERTED' && selectedStatus) {
        additionalRequiredFields = requiredFieldsByStatus.CONVERTED[selectedStatus] || [];
      }

      const requiredFields = [
        ...commonRequiredFields,
        ...statusSpecificRequiredFields,
        ...additionalRequiredFields,
      ];

      const fieldValues = {
        selectedSource,
        selectedtype,
        selectedcampigns,
        selectedclassification,
        comments,
        selectedDate,
        selectedTime,
        selectedBudget,
        selectedState,
        selectedCity,
        selectedStatus,
        selectedProject,
        size,
        price,
        applicantName,
        applicantContact,
        selectedCityfuture,
        selectedStatefuture,
      };

      for (const field of requiredFields) {
        if (!fieldValues[field]) {
          return field; // Return the first missing field
        }
      }
      return null; // No missing fields
    };

    const missingField = validateFields();

    if (missingField) {
      Toast.show({
        text1: `Please fill the required field: ${missingField}`,
        type: 'error',
      });
      return;
    }

    try {
      const response = await Update_Lead(
        selectedSource,
        selectedcampigns,
        selectedCity,
        selectedState,
        fullname,
        email,
        formattedSubmissionDate,
        selectedTime,
        selectedclassification,
        status,
        comments,
        selectedproject,
        selectedtype,
        selectedCategory,
        selectedSubcategory,
        selectedStatus,
        selectedproject,
        size,
        price,
        applicantName,
        applicantContact,
        selectedCityfuture,
        formattedDob,
        formattedDoa,
        whatsapp,
        address,
        leadid
      );

      console.log(response);

      if (response.msg === "Unauthorized request") {
        navigation.navigate('Login');
      }
      else if (response.msg === 'Save successfully') {
        Toast.show({
          text1: 'Save Successfully',
          type: 'success',
        });
        navigation.navigate('All Leads');
      } else {
        Toast.show({
          text1: response.msg,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  const handleStatusChange = value => {
    setStatus(value);
    setcomments('');
    setDate('');
    setTime('');
    setBudget('');
    setApplicantName('');
    setApplicantContact('');
    setApplicantCity('');
    setApplicantDob('');
    setApplicantDoa('');
    setPrice('');
    setSize('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View>
          <Pressable
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="phone" color="#625bc5" size={25} />
          </Pressable>
          <TextInput
            label="Contact Number"
            value={mobilenumner}
            onChangeText={text => {
              const formattedText = text.replace(/[^0-9]/g, '');
              setmobilenumber(formattedText.slice(0, 10));
            }}
            style={[styles.textinput, { paddingLeft: 30 }]}
            mode="outlined"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View>
          <Pressable
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="user" color="#625bc5" size={25} />
          </Pressable>
          <TextInput
            label="Full Name"
            value={fullname}
            onChangeText={text => setfullname(text)}
            style={[styles.textinput, { paddingLeft: 30 }]}
            mode="outlined"
          />
        </View>

        <View>
          <Pressable
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="mail" color="#625bc5" size={25} />
          </Pressable>
          <>
            <TextInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              style={[styles.textinput, { paddingLeft: 30 }]}
              mode="outlined"
              maxLength={100}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedSource}
              style={styles.picker}
              onValueChange={handleSourceChange}>
              <Picker.Item label="Select Source" value="" />
              {source.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.name} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedtype}
              style={styles.picker}
              onValueChange={handletypeChange}>
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Residential" value="Residential" />
              <Picker.Item label="Commercial" value="Commercial" />
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.picker}
              onValueChange={handleCategory}>
              <Picker.Item label="Select Category" value="" />
              {category.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedSubcategory}
              style={styles.picker}
              onValueChange={handleSubcategoryChange}>
              <Picker.Item label="Select Sub Category" value="" />
              {subcategory.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedclassification}
              style={styles.picker}
              onValueChange={handleclassificationChange}>
              <Picker.Item label="Select Classification" value="" />
              <Picker.Item label="Hot" value="hot" />
              <Picker.Item label="Cold" value="cold" />
              <Picker.Item label="Warm" value="warm" />
            </Picker>
          </View>
        </View>

        <View style={styles.dob}>
          <View style={{ width: '49%' }}>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedcampigns}
                style={styles.picker}
                onValueChange={handlecampignsChange}>
                <Picker.Item label="Select Campigns" value="" />
                {campigns.map((src, index) => (
                  <Picker.Item key={index} label={src.name} value={src.name} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ width: '49%' }}>
            <View style={styles.dropdowncontainer1}>
              <Picker
                selectedValue={selectedproject}
                style={styles.picker}
                onValueChange={handleprojectChange}>
                <Picker.Item label="Select Project" value="" />
                {project.map((src, index) => (
                  <Picker.Item
                    key={index}
                    label={src.project_name}
                    value={src.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.dob}>
          <View style={styles.dropdowncontainer}>
            <Picker
              selectedValue={selectedState}
              dropdownIconRippleColor={1}
              style={styles.picker}
              onValueChange={handleStateChange}>
              <Picker.Item label="Select State" value="" />
              {states.map((state, index) => (
                <Picker.Item key={index} label={state} value={state} />
              ))}
            </Picker>
          </View>

          <View style={styles.dropdowncontainer}>
            <Picker
              selectedValue={selectedCity}
              style={styles.picker}
              onValueChange={city => setSelectedCity(city)}>
              <Picker.Item label="Select City" value="" />
              {city.map((state, index) => (
                <Picker.Item
                  key={index}
                  label={state.city}
                  value={state.city}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View>
          <TextInput
            label="Enter Address"
            value={address}
            onChangeText={text => setaddress(text)}
            style={[styles.textinput]}
            mode="outlined"
          />
        </View>

        <View>
          <TextInput
            label="Enter Whatsapp number"
            value={whatsapp}
            onChangeText={text => setwhatsapp(text)}
            style={[styles.textinput]}
            mode="outlined"
            maxLength={10}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ margin: 10 }}>
        <View style={{ top: 10 }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={status}
              onValueChange={handleStatusChange}
              enabled={status !== 'CONVERTED'}>
              <Picker.Item label="Select Status" value="" />
              {statusData.map(statusItem => (
                <Picker.Item
                  key={statusItem.id}
                  label={statusItem.name}
                  value={statusItem.name}
                />
              ))}
            </Picker>
          </View>
        </View>

        {status === 'INTERESTED' ||
          status === 'CALL SCHEDULED' ||
          status === 'VISIT SCHEDULED' ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View style={{ width: '50%' }}>
                {showCalendarModal && (
                  <DateTimePicker
                    value={selectedDate ? new Date(selectedDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => handleDateSelect(event, date)}
                  />
                )}
                <TextInput
                  label="Select Date"
                  value={selectedDate || ''}
                  onChangeText={date => setSelectedDate(date)}
                  style={[styles.textinput, { marginTop: 10 }]}
                  mode="outlined"
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 17,
                    right: 16,
                    width: 30,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={addleads}>
                  <AntDesign name="calendar" color="#625bc5" size={25} />
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', marginLeft: 7 }}>
                <View style={{ width: '50%' }}>
                  <TextInput
                    label="Select Time"
                    value={selectedTime || ''}
                    onChangeText={time => setSelectedTime(time)}
                    style={[styles.textinput, { marginTop: 10 }]}
                    mode="outlined"
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 17,
                      right: 16,
                      width: 30,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={showTimePicker}>
                    <AntDesign name="clockcircleo" color="#625bc5" size={25} />
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmTime}
                  onCancel={hideTimePicker}
                />
              </View>
            </View>
          </>
        ) : null}

        {status === 'FUTURE LEAD' ? (
          <>
            <View style={[styles.dropdowncontainer1, { top: 20 }]}>
              <Picker
                selectedValue={selectedBudget}
                style={styles.picker}
                onValueChange={handleBudgetChange}>
                <Picker.Item label="Select Budget" value="" />
                <Picker.Item label="5-10L" value="5-10L" />
                <Picker.Item label="10-20L" value="10-20L" />
                <Picker.Item label="20-30L" value="20-30L" />
                <Picker.Item label="30-45L" value="30-45L" />
                <Picker.Item label="45-60L" value="45-60L" />
                <Picker.Item label="60-80L" value="60-80L" />
                <Picker.Item label="80-1cr" value="80-1cr" />
                <Picker.Item label="1-1.25cr" value="1-1.25cr" />
                <Picker.Item label="1.25-1.5cr" value="1.25-1.5cr" />
                <Picker.Item label="1.5-1.75cr" value="1.5-1.75cr" />
                <Picker.Item label="1.75-2cr" value="1.75-2cr" />
                <Picker.Item label="2-2.50cr" value="2-2.50cr" />
                <Picker.Item label="2.50-3cr" value="2.50-3cr" />
                <Picker.Item label="3-3.50cr" value="3-3.50cr" />
                <Picker.Item label="3.50-4cr" value="3.50-4cr" />
                <Picker.Item label="4-4.50cr" value="4-4.50cr" />
              </Picker>
            </View>

            <View
              style={{
                top: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.dropdowncontainer}>
                <Picker
                  selectedValue={selectedStatefuture}
                  dropdownIconRippleColor={1}
                  style={styles.picker}
                  onValueChange={handleStateChangefuture}>
                  <Picker.Item label="Select State" value="" />
                  {statesfuture.map((state, index) => (
                    <Picker.Item key={index} label={state} value={state} />
                  ))}
                </Picker>
              </View>

              <View style={styles.dropdowncontainer}>
                <Picker
                  selectedValue={selectedCityfuture}
                  style={styles.picker}
                  onValueChange={city => setSelectedCityfuture(city)}>
                  <Picker.Item label="Select City" value="" />
                  {cityfuture.map((state, index) => (
                    <Picker.Item
                      key={index}
                      label={state.city}
                      value={state.city}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </>
        ) : null}

        {status === 'CONVERTED' ? (
          <>
            <View style={[styles.dropdowncontainer1, { top: 20 }]}>
              <Picker
                selectedValue={selectedStatus}
                onValueChange={value => {
                  setSelectedStatus(value);
                }}>
                <Picker.Item label="Select Status" value="" />
                <Picker.Item label="Booked" value="BOOKED" />
                <Picker.Item label="Completed" value="COMPLETED" />
                <Picker.Item label="Cancelled" value="CANCELLED" />
              </Picker>
            </View>
            {selectedStatus === 'COMPLETED' && (
              <>
                <View style={{ top: 25 }}>
                  <View style={styles.dropdowncontainer1}>
                    <Picker
                      selectedValue={selectedProject}
                      style={styles.picker}
                      onValueChange={value => setSelectedProject(value)}>
                      <Picker.Item label="Select Project" value="" />
                      {project.map((src, index) => (
                        <Picker.Item
                          key={index}
                          label={src.project_name}
                          value={src.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={{ top: 25 }}>
                  <TextInput
                    label="Enter Size"
                    value={size}
                    onChangeText={text => setSize(text)}
                    style={styles.textinput}
                    maxLength={10}
                    mode="outlined"
                    keyboardType='numeric'
                  />
                </View>
                <View style={{ top: 25 }}>
                  <TextInput
                    label="Enter Price"
                    value={price}
                    onChangeText={text => setPrice(text)}
                    style={styles.textinput}
                    maxLength={10}
                    mode="outlined"
                    keyboardType='numeric'

                  />
                </View>
                <View style={{ top: 25 }}>
                  <TextInput
                    label="Applicant Name"
                    value={applicantName}
                    onChangeText={text => setApplicantName(text)}
                    style={styles.textinput}
                    mode="outlined"
                  />
                </View>
                <View style={{ top: 25 }}>
                  <TextInput
                    label="Applicant Contact"
                    value={applicantContact}
                    onChangeText={text => setApplicantContact(text)}
                    style={styles.textinput}
                    mode="outlined"
                    maxLength={10}
                    keyboardType="numeric"
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '10%',
                  }}>
                  <View
                    style={[
                      styles.dropdowncontainer,
                      { flex: 1, marginRight: 5 },
                    ]}>
                    <Picker
                      selectedValue={selectedStatefuture}
                      dropdownIconRippleColor={1}
                      style={styles.picker}
                      onValueChange={handleStateChangefuture}>
                      <Picker.Item label="Applicant State" value="" />
                      {statesfuture.map((state, index) => (
                        <Picker.Item key={index} label={state} value={state} />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={[
                      styles.dropdowncontainer,
                      { flex: 1, marginLeft: 5 },
                    ]}>
                    <Picker
                      selectedValue={selectedCityfuture}
                      style={styles.picker}
                      onValueChange={city => setSelectedCityfuture(city)}>
                      <Picker.Item label="Applicant City" value="" />
                      {cityfuture.map((state, index) => (
                        <Picker.Item
                          key={index}
                          label={state.city}
                          value={state.city}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View>
                  <Pressable onPress={() => setDobOpen(true)}>
                    <TextInput
                      placeholder="Applicant DOB"
                      value={selectedApplicantDob ? selectedApplicantDob.toLocaleDateString() : ''} 
                      editable={false}
                      style={[styles.textinput, { marginTop: 10 }]}
                      mode="outlined"
                    />
                    <Pressable
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setDobOpen(true)}>
                      <AntDesign name="calendar" color="#625bc5" size={25} />
                    </Pressable>
                  </Pressable>

                  <DatePicker
                    modal
                    open={dobOpen}
                    date={selectedApplicantDob || new Date()} 
                    mode="date"
                    onConfirm={date => {
                      setDobOpen(false);
                      setSelectedApplicantDob(date);
                    }}
                    onCancel={() => setDobOpen(false)}
                  />
                </View>

                <View>
                  <Pressable onPress={() => setDoaOpen(true)}>
                    <TextInput
                      placeholder="Applicant DOA"
                      value={selectedApplicantDoa ? selectedApplicantDoa.toLocaleDateString() : ''} 
                      editable={false}
                      style={[styles.textinput, { marginTop: 10 }]}
                      mode="outlined"
                    />
                    <Pressable
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setDoaOpen(true)}>
                      <AntDesign name="calendar" color="#625bc5" size={25} />
                    </Pressable>
                  </Pressable>

                  <DatePicker
                    modal
                    open={doaOpen}
                    date={selectedApplicantDoa || new Date()} 
                    mode="date"
                    onConfirm={date => {
                      setDoaOpen(false);
                      setSelectedApplicantDoa(date);
                    }}
                    onCancel={() => setDoaOpen(false)}
                  />
                </View>
              </>
            )}
          </>
        ) : null}

        <View style={{ top: 25 }}>
          <TextInput
            label="Enter Comments"
            value={comments}
            onChangeText={text => setcomments(text)}
            style={[styles.textinput]}
            mode="outlined"
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showdobmodal}
        onRequestClose={() => setshowdobmodal(false)}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Calendar
            onDayPress={day => handleDateSelectdob(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue' },
            }}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showdoamodal}
        onRequestClose={() => setshowdoamodal(false)}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Calendar
            onDayPress={day => handleDateSelectdoa(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue' },
            }}
          />
        </View>
      </Modal>

      <Pressable style={{ top: 40 }} onPress={Submit}>
        <Button text="Submit" />
      </Pressable>

      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
};

export default Updatelead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinput: {
    marginTop: 10,
  },
  form: {
    margin: 10,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  dob: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  picker: {
    borderBlockColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  dropdowncontainer: {
    width: '49%',
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
  },
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
  },
});