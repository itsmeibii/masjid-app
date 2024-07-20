import {Image, View, Text, SafeAreaView, StyleSheet ,Alert, Button, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, useRef, createRef } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import UserInput from '../components/input';
import EmailIconImport from 'react-native-vector-icons/MaterialCommunityIcons'
import PassIconImport from 'react-native-vector-icons/Foundation'
import ConfPassIconImport from 'react-native-vector-icons/Feather'
import { useAuth } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  UserInfoName  from './extrainfo1';
import UserInfoAge from './extrainfo2';
import UserInfoState from './extrainfo3'
import { StatusBar } from 'expo-status-bar';
;




SplashScreen.preventAutoHideAsync();

export default SignUpNavigator = () => {
const styles = StyleSheet.create({
    
  })
  const {Navigator, Screen} = createNativeStackNavigator();
  return (
    <Navigator initialRouteName = "signuporig" >
      <Screen name = "signuporig" component = {SignupScreen} options = {{headerShown : false}} />
      <Screen name = "nameinfo" component =  {UserInfoName} options = {{headerShown : false, presentation: 'card', gestureEnabled: true}} />
      <Screen name = 'ageinfo' component = {UserInfoAge} options = {{headerShown: false, presentation: 'card', gestureEnabled: true}} />
      <Screen name = 'stateinfo' component = {UserInfoState} options = {{headerShown: false, presentation: 'card', gestureEnabled: true}} />
    </Navigator>
  )

}

function SignupScreen({navigation}) {
   
    const [size, setSize] = useState(250);
    const {register, user, login} = useAuth();
    
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [inputs, setInputs] = useState(Array(3).fill(""));
    const inputRefs = useRef(inputs.map(() => createRef()));

    const getFonts = async () => {
        await Font.loadAsync({
            "Roboto_Mono": require('../assets/fonts/Roboto Mono.ttf'),
        });
        setFontsLoaded(true);
    };
    const onChangeInputs = (text, index) => {
        const newInputs = [...inputs];
        newInputs[index] = text;
        setInputs(newInputs);
    }
    
    
    const handleSignup =  () => {
        for (let i = 0; i < 3; i++) {
            if (!inputs[i]){
                let field = i > 0 ? 'password' : 'email';
                Alert.alert("Please fill in " + field + " field");
                inputRefs.current[i].current.focus();
                return;
            }
        }
        if (inputs[1] !== inputs[2]) {
            Alert.alert("Passwords must match");
            return;
        }
        navigation.navigate("nameinfo", {email: inputs[0], password: inputs[1]})
        
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
     
        const test = async() => { //email,password, firstName, lastName ,age,state , city, phoneNumber
            const response = await login('diger27@gmail.com','password');
            
        }
    

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style = "dark" />
            <Button title = "press me" onPress = {async () => await test()} />
            <View style={styles.title}>
                <Text style={{ fontSize: 50, paddingTop: 30,  fontWeight: 'bold' }}>Sign Up</Text>  
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
            <Image source = {require('../assets/loginpv.png')} style = {{height: size, width: size, marginBottom:90,}} />
                <KeyboardAvoidingView style={styles.login_input} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                
                    <UserInput ref = {inputRefs.current[0]} onChangeText = {(text) => onChangeInputs(text,0)} placeholder='Email'  icon = {(props) => {
                    return <EmailIconImport name = 'email-multiple' {...props}  />
                    }} onPress = {() => setSize(80)} />
                    <UserInput ref = {inputRefs.current[1]} onChangeText = {(text) => onChangeInputs(text,1)} placeholder='Password'  show = {false} icon = {(props) => {
                        return <PassIconImport name = 'key' {...props} />
                    }}/>
                    <UserInput ref = {inputRefs.current[2]}  onChangeText = {(text) => onChangeInputs(text,2)} placeholder='Confirm Password'  show = {false} icon = {(props) => {
                        return <ConfPassIconImport name = 'lock' {...props} />
                    }}/>
                    
                    
                    {loading ? (
                        <ActivityIndicator size="small" color="#2DE371" />
                    ) : (
                        

                        <TouchableOpacity style = {{width: '100%', justifyContent: 'center', alignItems: 'center', }} onPress = {handleSignup} >
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
                </KeyboardAvoidingView>
                </>

            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
