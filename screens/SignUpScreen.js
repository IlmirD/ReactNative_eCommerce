import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const SignUpScreen = ({navigation}) => {
    const[data, setData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });

    const [Error, SetError] = useState({
        password: '',
        passwordLength: '',
        server: '',
    });

    const [Register, SetRegister] = useState({
        register: '',
    });

    const SignUp = (username, email, password1, password2) => {
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password1);
        bodyFormData.append('password2', password2);
        
        if(password1 == password2) {
            if(password1.trim().length >= 8) {
                axios({
                    method: 'post',
                    url: 'http://192.168.43.181:8000/api/account/register',
                    data: bodyFormData,
                    headers: {'Content-Type': 'multipart/form-data' }
                })
                .then(res => {
                    console.log(res.data);
                    if(res.data.response){
                        SetRegister({ register: res.data })
                        Alert.alert(
                            "",
                            "Регистрация прошла успешно",
                            [
                              { text: "OK", onPress: () => navigation.navigate('SignIn') }
                            ],
                            { cancelable: false }
                          );
                    }
                    else {
                        SetError({ server: res.data})
                    }
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            else {
                SetError({ passwordLength: 'Длина должна быть минимум 8'})
            }
        }
        else {
            SetError({ password: 'Пароли должны совпадать'})
        }
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>

            <Animatable.View style={styles.footer} animation='fadeInUpBig'>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setData({...data, username: val})}
                    />
                </View>

                { Error.server ?
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>{Error.server.username}</Text> 
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
                        onChangeText={(val) => setData({...data, email: val})}
                    />
                </View>

                { Error.server ?
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>{Error.server.email}</Text> 
                    </Animatable.View>
                    :
                    null
                }

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setData({...data, password1: val})}
                    />
                </View>

                { Error.password ?
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>{Error.password}</Text> 
                    </Animatable.View>
                    :
                    null
                }
                
                { Error.passwordLength ?
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>{Error.passwordLength}</Text> 
                    </Animatable.View>
                    :
                    null
                }

                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirm password"
                        secureTextEntry={true}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setData({...data, password2: val})}
                    />
                </View>

                <View style={{ marginTop: 30 }}>
                    <Button
                    title="SignUp"
                    onPress={() => SignUp(data.username, data.email, data.password1, data.password2)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                    title="SignIn"
                    onPress={() => navigation.navigate('SignIn')}
                    />
                </View>

            </Animatable.View>
        </View>
    </ScrollView>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
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

