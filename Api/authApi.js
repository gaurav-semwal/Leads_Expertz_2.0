import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = 'https://pro-leadexpertz.clikzopdevp.com/api/';

export const isValidToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.log('Token not found');
      return false;
    }
    console.log('Token found:', token);

    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

export const Login_Api = async (email, password) => {
  try {
    const myHeaders = new Headers();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    const response = await fetch(`${base_url}login`, requestOptions);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Login Result:', result);

    if (result && result.data && result.data.token) {
      await AsyncStorage.setItem('authToken', result.data.token);
    } else {
      throw new Error('Invalid token received from server');
    }

    return result;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const Add_User = async (name, mobile, email, password,role) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Token:', token);

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append('token', token);

    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('mobile', mobile);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('role', role);


    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: formdata,
    };

    const response = await fetch(`${base_url}add-user`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.statusText} - ${errorText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_User = async id => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token:', token);
  
      if (!token) {
        throw new Error('Token not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append('token', token);
   
      const formdata = new FormData();
      formdata.append('customer_id', id);
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: formdata,
      };
  
      const response = await fetch(`${base_url}get-sale`, requestOptions);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.statusText} - ${errorText}`,
        );
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };