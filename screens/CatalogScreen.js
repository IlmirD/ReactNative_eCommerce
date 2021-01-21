import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

import { CatalogApi } from '../api/CatalogApi';
import { GetToken } from '../asyncstorage/GetToken';

const CatalogScreen = ({navigation}) => {
  const [Search, SetSearch] = useState({
    search: '',
  });

  // Display catalog or search items
  const CatalogAndSearch = () => {
    let _search = Search.search; 

  if (_search != '') {
    // search result
    const [SearchItems, setSearchItems] = useState({
      isLoading: true,
      searchItems: null,
    });
  
    useEffect(() => {
      setSearchItems({ isLoading: true })

      async function FindItem() {
        let token = await GetToken();
        // let token = '84291f39946c41df8294f01c8aed5576225fb75e';
        axios.get('http://192.168.0.101:8000/api/product/List?search=' + _search, {
          headers: {
              Authorization: 'Token ' + token
          }})
        .then(res => {
          setSearchItems({
                isLoading: false,
                searchItems: res.data.results
            });
        })
        .catch(function (error) {
        console.log(error);
        });
      }
    FindItem();
  }, [setSearchItems]);

    let searchItems = SearchItems.searchItems;
    return (
      <FlatList
      data={searchItems}
      renderItem={({item}) => (
          <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('DetailedView', 
          { Image: item.image, Name: item.name, Description: item.description})}>
              <View style={styles.searchContainer}>
                  <Image source={{uri: item.image}}
                  style={styles.searchImage}/>
                  <Text style={styles.searchText}>{item.name}</Text>
              </View>
          </TouchableWithoutFeedback>
      )}
      />
    );
  }
  // catalog
  else {
    let catalogItems = CatalogApi();
    if(catalogItems) {
      return (
        <Animatable.View animation='bounceIn' duration={1000} style={styles.container} >
          <FlatGrid
          itemDimension={130}
          data={catalogItems}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('Product', { Name: item.name})}>
                <View style={styles.itemContainer}>
                    <Image source={{uri: item.image}} style={styles.catalogImage}/>
                    <Text style={styles.searchText}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
          )}
        />
        </Animatable.View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="small" color="#0000ff" />
        </View>
        )
      }
    }
  } 
  // main view
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search..."
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
          onChangeText={text => SetSearch({search: text})}
        />
        <Ionicons name="ios-search" size={20} />
    </View>
      <CatalogAndSearch/>
    </View>
  );
}

export default CatalogScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let width = windowWidth / 2.5;
let height = windowHeight / 4.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
  },
  catalogImage: {
    width: width * 0.9,
    height: height * 0.9,
    // borderRadius: 15,
  },
  searchBox: {
    marginTop: Platform.OS === 'ios' ? 20 : 8, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  }, 
  searchImage: {
    width: 120,
    height: 120
  },
  searchText: {
      marginLeft: 20
  },
});