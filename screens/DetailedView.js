import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';

const DetailedView = ({route}) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: route.params.Image }}
            style={styles.image}/>
           <Text>{ route.params.Name }</Text>
           <Text style={{ padding: 10 }}>{ route.params.Description }</Text>
        </View>
    );
}

export default DetailedView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
    }, 
    image: {
        width: 200,
        height: 200,
        resizeMode: 'center',
    },
});