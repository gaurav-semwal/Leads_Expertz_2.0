import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Get_Inventory} from '../../../Api/authApi';

const Inventory = ({navigation}) => {
  const [data, setData] = useState([]); // State to hold API data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const widthArr = [50, 100, 150, 150, 150, 150, 150, 150, 150, 150]; // Adjusted widths for table columns

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await Get_Inventory();
      console.log('INVENTORY DATA', response);
      if (response.error) {
        ToastAndroid.show(response.msg, ToastAndroid.SHORT);
      } else {
        setData(response.data); // Update state with API data
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    }
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = data.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData, index) => (
      <Row
        key={rowData.id}
        data={[
          index + 1,
          rowData.type,
          rowData.category,
          rowData.sub_category,
          rowData.name,
          rowData.description,
          rowData.location,
          rowData.size,
          rowData.price,
          rowData.img1 ? (
            <Image
              source={require('../../Assets/logo.png')}
              style={styles.image}
              //   source={{ uri: rowData.img1 }}
              //   style={styles.image}
              //   onError={() => console.log('Failed to load image:', rowData.img1)}
              //   onLoad={() => console.log('Image loaded successfully:', rowData.img1)}
            />
          ) : (
            <Text>No Image</Text>
          ),
        ]}
        widthArr={widthArr}
        style={[
          styles.row,
          {backgroundColor: rowData.id % 2 === 0 ? '#F7F6E7' : '#E7E6E1'},
        ]}
        textStyle={styles.text}
      />
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}>
          <AntDesign name="left" color="#625bc5" size={25} />
        </TouchableOpacity>
        <Text style={styles.pageText}>
          {currentPage} / {totalPages}
        </Text>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}>
          <AntDesign name="right" color="#625bc5" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.buttoncontainer1}
          onPress={() => navigation.navigate('AddInventory')}>
          <Text style={styles.text1}>Add Inventory</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <View>
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={[
                'S.no',
                'Type',
                'Category Name',
                'Sub Category Name',
                'Property Name',
                'Description',
                'Location',
                'Size',
                'Price',
                'Image 1',
                'Image 2',
                'Image 3',
                'Image 4',
                'Image 5',
                'Action',
              ]}
              widthArr={widthArr}
              style={styles.header}
              textStyle={[styles.text, {color: '#000'}]}
            />
            {renderTableRows()}
          </Table>
        </View>
      </ScrollView>

      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  buttoncontainer1: {
    height: 38,
    width: '30%',
    borderRadius: 10,
    backgroundColor: '#625bc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: 'white',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  header: {
    height: 50,
    backgroundColor: '#f1f8ff',
  },
  row: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  image: {
    width: 100,
    alignSelf: 'center',
    height: 40,
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
});

export default Inventory;
