import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Compass from '../components/Compass'
import { useModal } from '../context/AuthContext'

const Qibla = () => {
  const {location: loc } = useModal()
  return (
    <View style = {{flex: 1, alignItems: 'center'}}>
      <Text style = {{fontSize: 30, fontWeight: 700, marginTop: 80,}}>Qibla Compass</Text>
      <Compass location = {loc}/>
    </View>
  )
}

export default Qibla

const styles = StyleSheet.create({})