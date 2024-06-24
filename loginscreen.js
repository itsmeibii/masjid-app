import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, {useState} from 'react'
//import {Kohana} from './assets/input-effects/lib/Kohana';
import * as Font from 'expo-font';
import { AppLoading } from 'expo-app-loading';


export default function Loginscreen() {
    const getFonts = () => Font.loadAsync({
        "Roboto_Mono": require('./assets/fonts/Roboto Mono.ttf'),
    })
    let [fontsLoaded,setFontsLoaded] = useState(false);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }, 
        login: {
            flex: 0.2,
            
        }
    })
    if (fontsLoaded) {
        return (
            <SafeAreaView style = {styles.container}>
                <View style = {styles.login}>
                    <Text style = {{fontSize: 50, fontFamily: 'Roboto_Mono'}}>Login</Text>  
                </View>
            </SafeAreaView>
          )
    } else {
        return <AppLoading startAsync = {getFonts} onFinish = {() => setFontsLoaded(true)} />
    }
  
}