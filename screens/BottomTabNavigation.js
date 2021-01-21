import React, {useEffect, useState} from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainScreen from './MainScreen';
import CatalogScreen from './CatalogScreen';
import AccountScreen from './AccountScreen';
import CartScreen from './CartScreen';

import DetailedView from './DetailedView';
import Product from './Product';

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={MainScreen} />
      <MainStack.Screen name="DetailedView" component={DetailedView} options={{ title: 'DetailedView'}} />
      <MainStack.Screen name="Product" component={Product} options={{ title: 'Product'}} />
    </MainStack.Navigator>
  );
}

const CatalogStack = createStackNavigator();

const CatalogStackScreen = () => {
  return (
    <CatalogStack.Navigator>
      <CatalogStack.Screen name="Catalog" component={CatalogScreen} options={{
        header: () => null,
      }}/>
      <CatalogStack.Screen name="DetailedView" component={DetailedView} options={{ title: 'DetailedView'}} />
      <CatalogStack.Screen name="Product" component={Product} options={{ title: 'Product'}} />
    </CatalogStack.Navigator>
  );
} 

const AccountStack = createStackNavigator();

const AccountStackScreen = ({ navigation }) => {

  const ClearAsyncStorage = async () => {
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
          params: { someParam: 'Param1' },
        },
      ],
    })
  }

  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} options={{
          title: '',
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="exit-to-app" 
                size={25}
                backgroundColor='#fff'
                color='#000'
                onPress={() => ClearAsyncStorage()}
              />
            </View>
          ),
      }}/>
    </AccountStack.Navigator>
    
  );
}

const CartStack = createStackNavigator();

const CartStackScreen = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={CartScreen} />
    </CartStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator>
      
      <BottomTab.Screen name="Main" component={MainStackScreen} 
        options={{
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={26} />  
          )
        }}/>

      <BottomTab.Screen name="Catalog" component={CatalogStackScreen} 
      options={{
        tabBarIcon: () => (
          <Ionicons name="laptop-outline" size={26} />
        )
      }}/>

      <BottomTab.Screen name="Cart" component={CartStackScreen} 
      options={{
        tabBarIcon: () => (
          <Ionicons name="ios-cart-outline" size={26} />
        )
      }}/>

      <BottomTab.Screen name="Account" component={AccountStackScreen} 
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons name="account-outline" size={26} />
        ),
      }}/>

    </BottomTab.Navigator>
    );
  }
  
export default BottomTabNavigation;