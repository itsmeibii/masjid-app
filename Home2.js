
import React from 'react'
import {Button, Text, View, StyleSheet, SafeAreaView} from 'react-native'

export default function Home2(props) {
   const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text : {
        fontSize: 24,
        color: 'black',
    }
   }) 
   return (
    <SafeAreaView style = {styles.container}>
        <Text>Hello Masjid Screen</Text>
        <Button title = 'details' onPress = {() => props.navigation.navigate('details')} />
    </SafeAreaView>
   );
}