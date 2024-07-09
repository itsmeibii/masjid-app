import { Image, View, Text, SafeAreaView, StyleSheet, Alert, Button, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import UserInput from '../components/input';
import EmailIconImport from 'react-native-vector-icons/MaterialCommunityIcons'
import PassIconImport from 'react-native-vector-icons/Foundation'
import ConfPassIconImport from 'react-native-vector-icons/Feather'
import { useAuth } from '../context/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function SignupScreen({navigation}) {
    const {register} = useAuth
    const einputref = useRef();
    const pinputref = useRef();
    const cpinputref = useRef();
    const emailRef = useRef("");
    const cpasswordRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const getFonts = async () => {
        await Font.loadAsync({
            "Roboto_Mono": require('../assets/fonts/Roboto Mono.ttf'),
        });
        setFontsLoaded(true);
    };

    const handleSignup =  async () => {
        if (!emailRef.current) {
            einputref.current.focus();
            Alert.alert('Please enter an email');
        } else if (!passwordRef.current) {
            pinputref.current.focus();
            Alert.alert('Please enter a password')
        }
        navigation.navigate('signupextras')
    };

    useEffect(() => {
        getFonts().then(() => {
            SplashScreen.hideAsync();
        }).catch(() => {
            // Handle font loading error
            // Alert.alert('Default Font Replaced');
        });
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            width: '100%'
        }, 
        signup_button : {
            height: 70,
            width: '90%',
            backgroundColor: '#2DE371',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '25%',
        },
        title: {
            flex: 0.25,
            alignItems: 'center',
            width: '100%',
            marginBottom: 0,
        },
        login_input: {
            flex: 0.5,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        signup : {
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            
        },
        forgot_password : {
            height: 30,
            width: '90%',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            marginBottom: 5,
            
        }
    });

    if (!fontsLoaded) {
        return null; // or a loading spinner component
    }
     
        
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={{ fontSize: 50, paddingTop: 30,  fontWeight: 'bold' }}>Sign Up</Text>  
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
            <Image source = {require('../assets/loginpv.png')} style = {{height: 250, width: 250, marginBottom:90,}} />
                <View style={styles.login_input}>
                
                    <UserInput onChangeText = {(text) => emailRef.current = text} placeholder='Email' ref = {einputref} icon = {(props) => {
                    return <EmailIconImport name = 'email-multiple' {...props}/>
                    }}  />
                    <UserInput   onChangeText = {(text) => passwordRef.current = text} placeholder='Password' ref = {pinputref} show = {false} icon = {(props) => {
                        return <PassIconImport name = 'key' {...props} />
                    }}/>
                    <UserInput   onChangeText = {(text) => cpasswordRef.current = text} placeholder='Confirm Password' ref = {cpinputref} show = {false} icon = {(props) => {
                        return <ConfPassIconImport name = 'lock' {...props} />
                    }}/>
                    
                    
                    {loading ? (
                        <ActivityIndicator size="small" color="#2DE371" />
                    ) : (
                        

                        <TouchableOpacity style = {{width: '100%', justifyContent: 'center', alignItems: 'center', }} onPress = {() => handleSignup()} >
                            <View style = {styles.signup_button}>
                                 <Text style = {{fontSize: 30, color: 'white', fontWeight: 900,}}> Register </Text>
                            </View>
                        </TouchableOpacity>
                        
                    )}
                    <View style = {styles.signup}>
                        <Text style = {{fontSize: 15,}}> Already have an account? </Text> 
                        <Pressable onPress = {() => navigation.navigate('login')}>
                        <Text style = {{fontWeight: 'bold', color: 'darkgreen', fontSize: 15,}}> Login! </Text>
                        </Pressable>
                    </View>
                </View>
                </>

            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
