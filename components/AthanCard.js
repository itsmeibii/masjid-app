import { StyleSheet, Text, View, Platform, ImageBackground } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';

const AthanCard = ({athanData}) => {
    if (!athanData) return null;
  return (
    <View style = {{width: '90%', height: '30%', backgroundColor: 'gray', marginVertical: 10, overflow: 'hidden', borderRadius: 20, alignItems: 'center',  ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
        android: {
          elevation: 5,
        },
      })}}>
    <ImageBackground source = {require('../assets/nabawi.jpg')} style = {{width: '100%', height: '100%' }}  >
    <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
            opacity: 0.1, // Adjust this value to control the image opacity
          }}
        />
        <View style = {{width: '100%', flex: 0.3, justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
            <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 20, color: 'white', textAlign: 'center', marginTop: 10}}>Atlanta Athan Times</Text>
        </View>
        <View style = {{width: '100%', flex: 0.7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          {Object.entries(athanData).map(([prayer, time]) => {
            return (
                <BlurView intensity={22} style = {{width: '25%', height: '40%', margin: 5, borderRadius: 15, overflow: 'hidden', justifyContent: 'space-around'}}>
                    <Text style = {{fontFamily: 'RobotoFlex', fontSize: 18, color: 'white', textAlign: 'center'}}>{prayer}</Text>
                    <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 15, color: 'white', textAlign: 'center'}}>{time}</Text>
                </BlurView>  
            )

          })}
        </View>
      
    </ImageBackground>
    </View>
  )
}

export default AthanCard

const styles = StyleSheet.create({})