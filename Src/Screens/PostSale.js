import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PostSale = ({ data }) => {
  const isDataAvailable = data && data.length > 0; 

  return (
    <View style={styles.container}>
      {isDataAvailable ? (
        <Text>PostSale</Text> 
      ) : (
        <>
          <Image 
            source={require('../Assets/something-lost.png')} 
            style={styles.image}
          />
        <Text style={[styles.errorText, { fontSize: 23 }]}>Oops, looks like the page is lost.</Text>
          <Text style={styles.errorText}>This is not a fault, just an accident that was not intentional.</Text>
        </> 
      )}
    </View>
  );
};

export default PostSale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  errorText: {
    marginBottom: 10,
    fontSize: 19,
    fontWeight: '500',
    color: 'gray',
    textAlign: 'center',
  },
});
