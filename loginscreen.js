import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import {Kohana} from './assets/input-effects/lib/Kohana';


export default function Loginscreen() {
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
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.login}>
            <Text style = {{fontSize: 50}}>Login</Text>
        </View>
    </SafeAreaView>
  )
}