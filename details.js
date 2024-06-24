import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Uinfo from './uinfo';
import SettingsButton from './SettingsButton';

function NDetails(props) {
    let name = props.fullname;
    let data = props.udata;
    const styles = StyleSheet.create({
        container : {
            flex:1,
             alignItems: 'center',
             
             backgroundColor: 'grey',
             overflow: 'scroll'
            
        },
        buttons: {
            flex: 1,
            width: '100%',
            marginTop: 40,
            alignItems: 'center',
        }
        
       }) 
       return (
        
        <SafeAreaView style = {styles.container}>
            <Uinfo name = 'Ibrahim Irfan' />
            <View style = {styles.buttons}>
            <SettingsButton top = {true} message = "General"  onPress = {() => console.log('Clicked')} activeOpacity = {0.9} underlayColor = 'grey' />
            <SettingsButton message = "General"  onPress = {() => console.log('Clicked')} activeOpacity = {0.9} underlayColor = 'grey' />
            <SettingsButton bottom = {true} message = "General" onPress = {() => console.log('Clicked')} activeOpacity = {0.9} underlayColor = 'grey'/>
            </View>
            </SafeAreaView>
        
       
       );
}
export default function Details () {
    const stack = createNativeStackNavigator();
    return (
        <stack.Navigator>
            <stack.Screen name = "detail" component={NDetails} options = {{headerShown: false,}} />
        </stack.Navigator>
    )
}