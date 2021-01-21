  import React, { useState } from 'react';
  import { View, ActivityIndicator } from 'react-native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { NavigationContainer } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import Authentication from './screens/Authentication';
  import BottomTabNavigation from './screens/BottomTabNavigation';

  const RootStack = createStackNavigator(); 
  
  const AppScreen = () => {
    return (
      <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='App' component={BottomTabNavigation}/>
        <RootStack.Screen name='Auth' component={Authentication}/>
      </RootStack.Navigator>
    );
  }

  const AuthScreen = () => {
    return (
      <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='Auth' component={Authentication}/>
        <RootStack.Screen name='App' component={BottomTabNavigation}/>
      </RootStack.Navigator>
    );
  }

  const App = () => {
    const [Token, SetToken] = useState({
      token: '',
      isloading: true,
    });

    const GetToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
          SetToken({ token: value, isloading: false })
        }
        else {
          SetToken({ isloading: false })
        }
      } catch(e) {
          console.log(e)
      }
    }
    GetToken();

    if(Token.isloading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    }
    else {
      if(Token.token) {
        return (
          <NavigationContainer>
            <AppScreen />
          </NavigationContainer>
        );
      }
      else {
        return (
          <NavigationContainer>
            <AuthScreen />
          </NavigationContainer>
        );
      }
    }
  }
  export default App;
