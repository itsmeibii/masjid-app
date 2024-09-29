import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Compass from '../components/Compass'
import { useModal } from '../context/AuthContext'

const Qibla = ({visible}) => {
  const {location: loc } = useModal()
  return (
    <View style = {{flex: 1, alignItems: 'center'}}>
      <ImageBackground source = {require('../assets/kaabah-bg.jpg')} style = {{flex: 1, zIndex: -1, width: '100%', alignItems: 'center' }} imageStyle = {{opacity: 0.5}}>
      <Text style = {{fontSize: 30, fontWeight: 700, marginTop: 80,}}>Qibla Compass</Text>
      
      <Compass location = {loc} visible = {visible}/>
      </ImageBackground>
      
    </View>
  )
}

export default Qibla

const styles = StyleSheet.create({})