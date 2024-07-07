
import React from 'react'
import {Button, Text, View, StyleSheet, SafeAreaView, Platform} from 'react-native'

export default function Home(props) {
   const styles = StyleSheet.create({
    safe: {
        flex: 1,
        alignItems: 'center',
        
    },
    container : {
        top: 20,
        flex: 0.4,
        width: '90%',
        backgroundColor: 'grey',
        borderRadius: '10',
        
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            android: {
                elevation: 5,
            },
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            default : {}
        }),
    },
    text : {
        fontSize: 24,
        color: 'black',
    }
   }) 
   return (
    <SafeAreaView style = {styles.safe}  >
        <View style = {styles.container} />

        
    </SafeAreaView>
   );
}