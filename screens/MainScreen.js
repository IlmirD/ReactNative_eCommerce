import React from 'react';
import {View, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';

import Swiper from 'react-native-swiper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

// importing api from another file
import { ProductAdsApi } from '../api/ProductAdsApi';
import { MarketingApi } from '../api/MarketingApi';
 
const MainScreen = ({ navigation }) => {

    let productAds = ProductAdsApi();
    let marketing = MarketingApi();

    try {
        return (
            <View style={styles.container}>
                <View style={styles.sliderContainer}>
                    <Swiper autoplay height={200}>
                        {
                            productAds.map((item) =>
                                <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('DetailedView', 
                                { Image: item.image, Name: item.name, Description: item.description})}>
                                    <Image source={{ uri: item.marketing_image }} style={styles.sliderImage}/>
                                </TouchableWithoutFeedback>
                            )
                        }
                    </Swiper>
                </View>
                
                <Animatable.View animation='fadeInRight' duration={1000} style={styles.marketingItems}>
                    <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                        {
                            marketing.map((item) =>
                                <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('Product', { Name: item.name})}>
                                    <View style={styles.marketingContainer}>
                                        <Image source={{ uri: item.image }} style={styles.marketingImage}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }
                    </ScrollView>
                </Animatable.View>

            </View>
        );
    }
    catch {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        )
    }
}

export default MainScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let width = windowWidth / 2.5;
let height = windowHeight / 5.5;

console.log(windowHeight);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    sliderContainer: {
        height: 175,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#f1f1f1',
        borderRadius: 8,
        borderWidth: 1,
    },
    sliderImage: {
        height: 155,
        width: 400,
        alignSelf: 'center',
        resizeMode: 'stretch',
    },
    marketingItems: {
        flex: 1,
        alignItems: 'center',
    },
    marketingContainer: {
        alignItems: 'center',
        marginLeft: 5,
    },
    marketingImage: {
        width: width,
        height: height,
        margin: 15,
        borderRadius: 10,
        resizeMode: 'contain',
    },
});