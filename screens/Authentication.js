import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Auth = createStackNavigator();

  const Authentication = () => {
    return (
      <Auth.Navigator headerMode="none">
          <Auth.Screen name='SignIn' component={SignInScreen} />
          <Auth.Screen name='SignUp' component={SignUpScreen} />
      </Auth.Navigator>
    );
}

export default Authentication;