import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { GetToken } from '../asyncstorage/GetToken';

import axios from 'axios';

const ComputerScreen = ({navigation, route}) => { 
    const [Product, setProduct] = useState({
        isLoadingProduct: true,
        product: null,
      });
      
    useEffect(() => {
        setProduct({ isLoadingProduct: true})

        async function Product() {
            let token = await GetToken(); 
            axios.get('http://192.168.0.101:8000/api/product/' + route.params.Name, {
                headers: {
                    Authorization: 'Token ' + token
                }})
            .then(res => {
                setProduct({
                    isLoadingProduct: false,
                    product: res.data.results
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    
    Product();
        
    }, [setProduct]);
  
    let product = Product.product;
    return (
        <View style={styles.container}>
            <FlatList
            data={product}
            renderItem={({item}) => (
                <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('DetailedView', 
                { Image: item.image, Name: item.name, Description: item.description})}>
                    <View style={[styles.container, {margin: 20}]}>
                        <View style={{ maxHeight: 100 }}>
                            <Image source={{uri: item.image}}
                            style={styles.image}/>
                        </View>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
            />
        </View>
    );
}

export default ComputerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'center',
    },
    text: {
        marginLeft: 20
    }
});