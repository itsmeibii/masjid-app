import { View, Text, SafeAreaView, StyleSheet, Alert, TextInput, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Hideo } from 'react-native-textinput-effects';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



SplashScreen.preventAutoHideAsync();

export default function Loginscreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const getFonts = async () => {
        await Font.loadAsync({
            "Roboto_Mono": require('./assets/fonts/Roboto Mono.ttf'),
        });
        setFontsLoaded(true);
    };

    useEffect(() => {
        getFonts().then(() => {
            SplashScreen.hideAsync();
        }).catch(() => {
            Alert.alert('Default Font Replaced');
            
        });
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            width: '100%'
        }, 
        title: {
            flex: 0.2,
            alignItems: 'flex-start',
            width: '100%',
        },
        login_input: {
            flex: 0.6,
            width: '100%',
            backgroundColor: 'grey',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        username : {
            width: '90%',
            borderRadius: 20,
            flex: 0.2,
            borderColor: 'black',
            borderWidth: 3,
            backgroundColor: 'white',
            fontSize: 30,
            paddingLeft: 10,
           
        },
        password: {
            width: '90%',
            borderRadius: 20,
            flex: 0.2,
            borderColor: 'black',
            borderWidth: 3,
            backgroundColor: 'white',
            fontSize: 30,
            paddingLeft: 10,
        }
    });

    if (!fontsLoaded) {
        return null; // or a loading spinner component
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={{ fontSize: 50, fontFamily: fontsLoaded ? 'Roboto_Mono' : 'Arial', marginLeft: 40, marginTop: 40 }}>Login</Text>  
            </View>
            <View style={styles.login_input}>
            
            <TextInput placeholder = ' EMAIL'  style = {styles.username} autoCapitalize = 'none' autoCorrect = {false} />
            <TextInput placeholder = ' PASSWORD'  style = {styles.password} autoCapitalize = 'none' autoCorrect = {false}/>
            <Button title = "Log In" color = 'blue' onPress = {() => console.log('pressed')}/>
            </View>
        </SafeAreaView>
    );
}
