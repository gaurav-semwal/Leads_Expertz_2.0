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

export const Add_User = async (name, mobile, email, password, role) => {
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

export const Get_User = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Token:', token);

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append('token', token);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(`${base_url}get-user`,requestOptions);

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

export const Get_Role = async (email, password) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Token:', token);

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append('token', token);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    const response = await fetch(`${base_url}get-role`, requestOptions);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Login Result:', result);
 
    return result;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const Get_State = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-state`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_City = async (state) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("state", state);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-city`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Category = async (type) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("type", type);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-category`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Sub_Category = async (category_id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("category_id", category_id);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-sub-category`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Source = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-source`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Campaigns = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-campaign`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Project = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-project`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Add_Lead = async (
  type, category_id, sub_category_id, source, campaign, classification, project_id, city, state, address, name, email, phone, whatsapp_no
) => {
  console.log('----->', type, category_id, sub_category_id, source, campaign, classification, project_id, city, state, address, name, email, phone, whatsapp_no);
  try {
    const isValid = await isValidToken();
    if (!isValid) {
      console.log('invaid')
      throw new Error('Invalid or expired token');
    }

    const token = await AsyncStorage.getItem('authToken');
    console.log('Token:', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("type", type);
    formdata.append("category_id", category_id);
    formdata.append("sub_category_id", sub_category_id);
    formdata.append("source", source);
    formdata.append("campaign", campaign);
    formdata.append("classification", classification);
    formdata.append("project_id", project_id);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("address", address);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("whatsapp_no", whatsapp_no);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}add-lead`, requestOptions);
    console.log('Response:', response);

    const statusCode = response.status;
    console.log('Status Code:', statusCode);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${statusCode}`);
    }

    const result = await response.json();
    console.log('Result:', result);

    return { statusCode, result };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const Get_Lead_Booked = async (conv_type) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    
    const formdata = new FormData();
    formdata.append("conv_type", conv_type);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-leads`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Lead = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-leads`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Status = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-status`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_Birthday = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-birthday`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};


export const Update_Lead = async (
  source,
  campaign,
  city,
  state,
  name,
  email,
  remind_date,
  remind_time,
  classification,
  status,
  comment,
  project,
  category_type,
  category_id,
  sub_category_id,
  conv_type,
  project_id,
  prop_size,
  final_price,
  app_name,
  app_contact,
  app_city,
  app_dob,
  app_doa,
  whatsapp,
  address,
  lead_id
) => {
  console.log(source,
    campaign,
    city,
    state,
    name,
    email,
    remind_date,
    remind_time,
    classification,
    status,
    comment,
    project,
    category_type,
    category_id,
    sub_category_id,
    conv_type,
    project_id,
    prop_size,
    final_price,
    app_name,
    app_contact,
    app_city,
    app_dob,
    app_doa,
    whatsapp,
    address,
    'leadid', lead_id)
  try {
    const isValid = await isValidToken();
    if (!isValid) {
      console.log('Invalid token');
      throw new Error('Invalid or expired token');
    }
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.log('Token not found');
      throw new Error('Token not found');
    }
    console.log('Token:', token);

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("source", source);
    formdata.append("campaign", campaign);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("remind_date", remind_date);
    formdata.append("remind_time", remind_time);
    formdata.append("classification", classification);
    formdata.append("status", status);
    formdata.append("comment", comment);
    formdata.append("project", project);
    formdata.append("category_type", category_type);
    formdata.append("category_id", category_id);
    formdata.append("sub_category_id", sub_category_id);
    formdata.append("conv_type", conv_type);
    formdata.append("project_id", project_id);
    formdata.append("prop_size", prop_size);
    formdata.append("final_price", final_price);
    formdata.append("app_name", app_name);
    formdata.append("app_contact", app_contact);
    formdata.append("app_city", app_city);
    formdata.append("app_dob", app_dob);
    formdata.append("app_doa", app_doa);
    formdata.append("whatsapp", whatsapp);
    formdata.append("address", address);
    formdata.append("lead_id", lead_id);

    // Fetch request
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    const response = await fetch(`${base_url}update-lead`, requestOptions);
    const data = await response.json();

    // Return the response data
    return data;
  } catch (error) {
    // Handle and log errors
    console.error('Error:', error);
    throw error;
  }
};



export const Add_Category = async (type, name) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("type", type);
    formdata.append("name", name);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}add-category`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Add_Sub_Category = async (categoryid, name) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("category_id", categoryid);
    formdata.append("name", name);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}add-sub-category`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Add_Inventory = async (
  categorytype, 
  categoryid, 
  subcategoryid, 
  name, 
  description, 
  location, 
  price, 
  size, 
  file1, 
  file2, 
  file3, 
  file4, 
  file5, 
  video_link, 
  pdfFile
) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    // Create FormData
    const formdata = new FormData();
    formdata.append("category_type", categorytype);
    formdata.append("category_id", categoryid);
    formdata.append("sub_category_id", subcategoryid);
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("location", location);
    formdata.append("price", price);
    formdata.append("size", size);
    formdata.append("video_link", video_link);

    // Function to append files with correct URIs and types
    const addFile = (uri, name, type = 'image/jpeg') => {
      if (!uri) return null;
      return {
        uri: uri,
        type: type,
        name: name,
      };
    };

    // Handle images
    const files = [file1, file2, file3, file4, file5];
    const fileNames = ['file1.jpg', 'file2.jpg', 'file3.jpg', 'file4.jpg', 'file5.jpg'];

    files.forEach((fileUri, index) => {
      if (fileUri) {
        const file = addFile(fileUri, fileNames[index]);
        if (file) {
          console.log(`Appending file ${index + 1}:`, file);
          formdata.append(`file${index + 1}`, file);
        }
      }
    });

    // Handle PDF
    if (pdfFile) {
      const pdf = addFile(pdfFile, 'document.pdf', 'application/pdf');
      if (pdf) {
        console.log('Appending PDF:', pdf);
        formdata.append('document', pdf);
      }
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    console.log('Making request with options:', requestOptions);

    const response = await fetch('https://pro-leadexpertz.clikzopdevp.com/api/add-inventory', requestOptions);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};


export const Get_Lead_Data = async (leadid) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("lead_id", leadid);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-lead-data`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Pending_Allocate = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}pending-allocate`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
export const Get_Inventory = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-inventory`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Get_user = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-users`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    // Ensure this is logged to compare
    console.log('API Response:', result);

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};


export const Allocate_Lead = async (leadIds, userId) => {
  console.log('222222222222222222222', leadIds, userId);
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);
    // Add the "Cookie" header if required by your server.

    const formdata = new FormData();
    formdata.append("lead_ids", JSON.stringify(leadIds)); // Convert leadIds to JSON string if the server expects a JSON string
    formdata.append("user_id", String(userId)); // Convert userId to string

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}allocate-lead`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Ensure the response is JSON

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Add_Quick_Lead = async (name, number
) => {
  try {
    const isValid = await isValidToken();
    if (!isValid) {
      console.log('invaid')
      throw new Error('Invalid or expired token');
    }

    const token = await AsyncStorage.getItem('authToken');
    console.log('Token:', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("phone", number);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}add-lead`, requestOptions);
    console.log('Response:', response);

    const statusCode = response.status;
    console.log('Status Code:', statusCode);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${statusCode}`);
    }

    const result = await response.json();
    console.log('Result:', result);

    return { statusCode, result };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const Search_lead = async (fromUser, status) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("fromUser", fromUser);
    formdata.append("status", status)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}search-lead`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Lead_Transfer = async (status, toUser, lead_ids) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("toUser", toUser);
    formdata.append("lead_ids", JSON.stringify(lead_ids)); 

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}lead-transfer`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Dashboard = async (status, toUser, lead_ids) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("toUser", toUser);
    formdata.append("lead_ids", lead_ids);


    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}dashboard`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Start_Day = async (lastlocation) => {
  console.log(lastlocation)
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "multipart/form-data");

    const formdata = new FormData();
    formdata.append("last_location", lastlocation);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}start-day`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const End_Day = async (lastlocation) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("last_location", lastlocation);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}end-day`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Update_Location = async (lastlocation) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("last_location", lastlocation);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}update-location`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Add_Task = async (task,deadLineTime,deadLineDate) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("task", task);
    formdata.append("deadLineTime", deadLineTime);
formdata.append("deadLineDate", deadLineDate);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}add-task`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
export const Get_Task = async (status) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("status", status);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}get-task`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Update_Task = async (remarks) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const formdata = new FormData();
    formdata.append("remarks", remarks);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch(`${base_url}update-task`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const Add_Expense = async (
  title,
  category,
  amount,
  comments,
  exp_date,
  files,
) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }

    const myHeaders = new Headers();
    myHeaders.append('token', token);

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('category', category);
    formdata.append('amount', amount);
    formdata.append('comments', comments);
    formdata.append('exp_date', exp_date);
    formdata.append('files', files);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const response = await fetch(`${base_url}add-expense`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};