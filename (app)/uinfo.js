import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Uinfo(props) {
  const styles = StyleSheet.create({
    pfp: {
      height: 100,
      width: 100,
      borderRadius: 50,
      
      marginLeft: 20,
      marginRight: 30,
      resizeMode: 'contain',
      
      
  },
  info: {
      overflow: 'hidden',
      flexDirection: 'row',
      flex: 0.25,
      top: 30,
      backgroundColor: 'white',
      width: '90%',
      alignItems: 'center',
      
      borderRadius: 30,
      
  }, 
  details: {
    container: {

    },
    name: {
      fontSize: 24,
    }
  }
  })

  return (
    <View style = {styles.info}>
      <Image source = {require('../assets/pfp.png')} style = {styles.pfp} />
      <View style = {styles.details.container} >
    <Text style = {styles.details.name}>{props.name}</Text>
      </View>
      
    </View>
    
    
  )
}