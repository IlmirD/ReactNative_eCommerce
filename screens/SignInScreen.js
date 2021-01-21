import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity, 
    TextInput,
    Platform,
    ScrollView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
    const[data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const [Error, SetError] = useState({
        error: '',
    });
    
    const EmailInputChange = (val) =>{
        if(val.length != 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                secureTextEntry: true,
            });
        }
        else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                secureTextEntry: true,
            });
        }
    }

    const PasswordInputChange = (val) => {
        setData({
            ...data,
            password: val,
            secureTextEntry: true,
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    }

    const SignIn = (email, password) => {
        var bodyFormData = new FormData();
        bodyFormData.append('username', email);
        bodyFormData.append('password', password);

        const storeData = async (value, email) => {
            try {
                await AsyncStorage.multiSet([['token', value], ['email', email]])
                console.log('success')
            } catch (e) {
                console.log(e);
            }
        }

        axios({
            method: 'post',
            url: 'http://192.168.0.101:8000/api/account/login',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
            if(res.data.token) {
                storeData(res.data.token, email);
                navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'App',
                        params: { someParam: 'Param1' },
                      },
                    ],
                })
            }
        })
        .catch(function (error) {
            console.log(error);
            SetError({ error: 'invalid login'})
        });
    }

    return (
        <View style={styles.container}>
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>

            <Animatable.View style={styles.footer} animation='fadeInUpBig'>

                { Error.error ?
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Неправильный логин или пароль</Text> 
                    </Animatable.View>
                    :
                    null
                }
                
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Email"
                        style={styles.textInput}
                        keyboardType='email-address'
                        autoCapitalize="none"
                        onChangeText={(val) => EmailInputChange(val)}
                    />
                    { data.check_textInputChange ?
                    <Animatable.View animation="bounceIn">
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    
                    : null}
                </View>

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => PasswordInputChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        { data.secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        : 
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 50 }}>
                    <Button
                    title="SignIn"
                    onPress={() => SignIn(data.email, data.password)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                    title="SignUp"
                    onPress={() => navigation.navigate('SignUp')}
                    />
                </View>

            </Animatable.View>
         </ScrollView>
        </View>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        marginTop: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});

