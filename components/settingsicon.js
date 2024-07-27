import { View, Text, Image, TouchableOpacity, StyleSheet , ActivityIndicator} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function Settingsicon() {
    const [loading,setLoading] = React.useState(false);

    const styles = StyleSheet.create({
        settings: {
            height: 20,
            width: 20,
            
          },
    })
  return (
      <>
      {loading ? (
          <ActivityIndicator size = 'small' color = 'black' />
          ): (
              <TouchableOpacity onPress = {async () =>  {
                  setLoading(true);
                  await logout()
                  setLoading(false);
              }}>
                  <Image source = {require('../assets/logouticon.png')} style = {styles.settings}/>
              </TouchableOpacity>
          )}
      </>

  )
}