import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserInput from '../components/input'

const SignupExtras = () => {
    const styles = StyleSheet.create({
        title: {
            marginTop: 10,
            fontSize: 40,
            textAlign: 'left',
            marginLeft: 10,
            fontWeight: 'bold',
        }
    })
  return (
    
    <SafeAreaView >
        
        <Text style = {styles.title} > Just a Few More Things...</Text>
        <View style = {styles.container}></View>
        
    </SafeAreaView>
  )
}

export default SignupExtras

