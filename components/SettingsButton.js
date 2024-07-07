import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'

export default function SettingsButton({message,top,bottom, ...props}) {
   
    toprad = top ? 15 : 0;
    botrad = bottom ? 15 : 0;
    const styles = StyleSheet.create({
        touchable : {
            marginTop:  props.first ? 40 : 0,
            
            width: '90%',
            borderTopLeftRadius: toprad,
            borderTopRightRadius: toprad,
            borderBottomLeftRadius: botrad,
            borderBottomRightRadius: botrad,
            height: 40,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'grey',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            justifyContent: 'center',
        },
        text : {
          marginLeft: '5%',
          fontSize: 17  
            
        }
    })
  return (
    <TouchableHighlight style = {styles.touchable} {...props} >
        <View style = {styles.button}>
            <Text style = {styles.text}>{message}</Text>
        </View>
    </TouchableHighlight>
  )
}