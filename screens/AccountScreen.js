import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, FlatList, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import { ShippingAddressApi } from '../api/ShippingAddressApi';
import { OrderItemsApi } from '../api/OrderItemsApi';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AccountScreen = () => {

    const renderContent = () => (
        <View style={{ backgroundColor: 'white', height: windowHeight }} >
            <View>
                <Button
                title='Cancel'
                onPress={() => sheetRef.current.snapTo(1)}/>
            </View>
        </View>
      );

    const sheetRef = React.useRef(null);
    let address = ShippingAddressApi();
    let orderItems = OrderItemsApi();

    return (
        <>
        <View style={styles.container}>
            <ScrollView>
                <FlatList
                data={address}
                renderItem={({item}) => (
                    <View style={styles.container} key={item.id}>
                        <Text style={{fontSize: 18, marginLeft: 30, marginTop: 10, marginBottom: 10}}>
                            {item.username}
                        </Text>

                        <View style={[styles.row, styles.shippingAddress]}>
                            <View style={{ alignItems:'flex-start'}}>
                                <Text style={styles.text}>Shipping address</Text>
                            </View>
                            <View style={[styles.column, {alignItems: 'flex-end', marginRight: 20}]}>
                                <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
                                    <FontAwesome name='edit' size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.text}>Region:</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>{item.region}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.text}>Distict:</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>{item.district}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.text}>City:</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>{item.city}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.text}>Zipcode:</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>{item.zip_code}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.text}>Street:</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>{item.street}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.text}>House:</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.text}>{item.house}</Text>
                            </View>
                        </View>

                    </View>
                )}
                />

                <View style={[styles.shippingAddress, {marginTop: 30}]}>
                    <Text style={styles.text}>My orders</Text>
                </View>

                <FlatList
                data={orderItems}
                renderItem={({item}) => (
                    <View style={styles.row} key={item.id}>
                        <View style={styles.column}>
                            <Image source={{ uri: item.order_item[0].product.image}} style={styles.image}/>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.text}>{item.order_item[0].product.name}</Text>
                        </View>
                    </View>
                )}/>

            </ScrollView>
        </View>
        <BottomSheet
            ref={sheetRef}
            initialSnap={1}
            snapPoints={[windowHeight * 0.9, 0]}
            renderContent={renderContent}
            enabledContentGestureInteraction={true}
        />
        </>
    );
}

export default AccountScreen;

const imageHeigth = windowHeight / 5;
const imageWidth = windowWidth / 3 ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
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
    shippingAddress: {
        borderColor: '#f1f1f1',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        // paddingBottom: 10,
        paddingTop: 10,
        marginLeft: 30,
    },
    text: {
        fontSize: 16,
        fontFamily: 'normal',
    },
    image: {
        width: imageWidth,
        height: imageHeigth,
    },
    button: {
        marginTop: 100,
    },
});