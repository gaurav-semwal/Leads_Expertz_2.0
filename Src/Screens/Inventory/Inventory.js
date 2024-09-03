import React, { useEffect, useState ,useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Modal,
  Linking
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Get_Inventory } from '../../../Api/authApi';
import { useFocusEffect } from '@react-navigation/native';

const baseUrl = 'https://pro-leadexpertz.clikzopdevp.com/';

const Inventory = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const widthArr = [50, 100, 150, 150, 150, 150, 150, 150, 150, 100, 100, 100, 100, 100, 100,190,100];

  useFocusEffect(
    useCallback(() => {
      fetchInventory();
  }, [])
);

  const fetchInventory = async () => {
    try {
      const response = await Get_Inventory();
      console.log('INVENTORY DATA', response);
      if (response.error) {
        ToastAndroid.show(response.msg, ToastAndroid.SHORT);
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    }
  };

  const handleShare = async (imageUri) => {
    console.log(imageUri)
    try {
      const shareOptions = {
        title: 'Share via',
        url: imageUri,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
      ToastAndroid.show('Failed to share the image', ToastAndroid.SHORT);
    }
  };

  const handleImagePress = (imageUri) => {
    setSelectedImage([{ url: imageUri }]);
    setModalVisible(true);
  };

  const generateShareLink = (rowData) => {
    console.log('ccccccc',rowData)
    const token = rowData.token;
    const shareLink = `${baseUrl}/view-inventory?token=${token}`;
    return shareLink;
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = data.slice(startIndex, endIndex);

    return dataToDisplay.map((rowData) => (
      <Row
        key={rowData.id}
        data={[
          rowData.id,
          rowData.type,
          rowData.category,
          rowData.sub_category,
          rowData.name,
          rowData.description,
          rowData.location,
          rowData.size,
          rowData.price,
          rowData.img1 ? (
            <TouchableOpacity onPress={() => handleImagePress(`${baseUrl}${rowData.img1}`)}>
              <Image
                source={{ uri: `${baseUrl}${rowData.img1}` }}
                style={styles.image}
                onError={() => console.log('Failed to load image:', rowData.img1)}
                onLoad={() => console.log('Image loaded successfully:', rowData.img1)}
              />
            </TouchableOpacity>
          ) : (
            <Text>No Image</Text>
          ),
          rowData.img2 ? (
            <TouchableOpacity onPress={() => handleImagePress( `${baseUrl}${rowData.img2}`)}>
              <Image
              source={{ uri: `${baseUrl}${rowData.img2}` }}
                style={styles.image}
                onError={() => console.log('Failed to load image:', rowData.img2)}
                onLoad={() => console.log('Image loaded successfully:', rowData.img2)}
              />
            </TouchableOpacity>
          ) : (
            <Text>No Image</Text>
          ),
          rowData.img3 ? (
            <TouchableOpacity onPress={() => handleImagePress(`${baseUrl}${rowData.img3}` )}>
              <Image
                 source={{ uri: `${baseUrl}${rowData.img3}` }}
                style={styles.image}
                onError={() => console.log('Failed to load image:', rowData.img3)}
                onLoad={() => console.log('Image loaded successfully:', rowData.img3)}
              />
            </TouchableOpacity>
          ) : (
            <Text>No Image</Text>
          ),
          rowData.img4 ? (
            <TouchableOpacity onPress={() => handleImagePress(`${baseUrl}${rowData.img4}` )}>
              <Image
                source={{ uri: `${baseUrl}${rowData.img4}` }}
                style={styles.image}
                onError={() => console.log('Failed to load image:', rowData.img4)}
                onLoad={() => console.log('Image loaded successfully:', rowData.img4)}
              />
            </TouchableOpacity>
          ) : (
            <Text>No Image</Text>
          ),
          rowData.img5 ? (
            <TouchableOpacity onPress={() => handleImagePress(`${baseUrl}${rowData.img5}`)}>
              <Image
               source={{ uri: `${baseUrl}${rowData.img5}` }}
                style={styles.image}
                onError={() => console.log('Failed to load image:', rowData.img5)}
                onLoad={() => console.log('Image loaded successfully:', rowData.img5)}
              />
            </TouchableOpacity>
          ) : (
            <Text>No Image</Text>
          ),
          rowData.document ? (
            <TouchableOpacity onPress={() => handleImagePress(`${baseUrl}${rowData.document}`)}>
              <Image
               source={{ uri: `${baseUrl}${rowData.document}` }}
                style={styles.image}
                onError={() => console.log('Failed to load image:', rowData.document)}
                onLoad={() => console.log('Image loaded successfully:', rowData.document)}
              />
            </TouchableOpacity>
          ) : (
            <Text>No Document</Text>
          ),
          rowData.video_link ? (
            <TouchableOpacity onPress={() =>Linking.openURL(rowData.video_link)}>
         <Text style={{color:'blue', textAlign:'center'}}>{rowData.video_link} </Text> 
          </TouchableOpacity>
        ) : (
          <Text>No Document</Text>
        ),

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare(generateShareLink(rowData))}>
            <FontAwesome name="share-alt" color="#625bc5" size={25} />
          </TouchableOpacity>,
        ]}
        widthArr={widthArr}
        style={[
          styles.row,
          { backgroundColor: rowData.id % 2 === 0 ? '#F7F6E7' : '#E7E6E1' },
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
                'Document',
                'Video Link',
                'Action',
              ]}
              widthArr={widthArr}
              style={styles.header}
              textStyle={[styles.text, { color: '#000' }]}
            />
            {renderTableRows()}
          </Table>
        </View>
      </ScrollView>

      {renderPagination()}

      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <ImageViewer imageUrls={selectedImage} />
      </Modal>
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
    width: '100%',
    height: 60,
    resizeMode: 'cover',
    alignSelf: 'center',
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
  actionButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Inventory;