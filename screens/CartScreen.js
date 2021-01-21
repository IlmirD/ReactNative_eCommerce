import React from 'react';
import {View, StyleSheet, Text, Button, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { CartItemsApi } from '../api/CartItemsApi';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CartScreen = ({navigation}) => {

    let cartItems = CartItemsApi();
    return (
        <View style={styles.container}>
            <FlatList
            data={cartItems}
            renderItem={({item}) => (
                <View style={styles.row} key={item.id}>
                    <View style={styles.column}>
                        <Image source={{ uri: item.order_item[1].product.image}} style={styles.image}/>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.text}>{item.order_item[1].product.name}</Text>
                            <View style={[styles.row, {marginTop: 50}]}>
                                <TouchableOpacity>
                                    <View style={{padding: 10}}>
                                        <Ionicons name='add-circle' size={30} />
                                    </View>
                                </TouchableOpacity>

                                <Text>1</Text>

                                <TouchableOpacity>
                                    <View style={{padding: 10}}>
                                        <Ionicons name='remove-circle' size={30} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                    </View>
                </View>
            )}/>
        </View>
    );
}

export default CartScreen;

const imageHeigth = windowHeight / 4.5;
const imageWidth = windowWidth / 2.5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
        marginLeft: 30,
    },
    text: {
        fontSize: 16,
        fontFamily: 'normal',
    },
    image: {
        width: imageWidth,
        height: imageHeigth,
        resizeMode: 'center',
    },
});

