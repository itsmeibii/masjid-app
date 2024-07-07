import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Settingsicon() {
    const navigationn = useNavigation();
    const styles = StyleSheet.create({
        settings: {
            height: 20,
            width: 20,
            
          },
    })
  return (
    <TouchableOpacity onPress = {() => navigationn.navigate('details')}>
            <Image source = {require('../assets/settingsicon.png')} style = {styles.settings}/>
          </TouchableOpacity>
  )
}