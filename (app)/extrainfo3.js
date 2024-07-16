import {    TouchableOpacity, SafeAreaView,StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
import Check from 'react-native-vector-icons/Octicons'
import Back from 'react-native-vector-icons/Feather'
import * as SplashScreen from 'expo-splash-screen'
import  Picker  from 'react-native-picker-select'

const UserInfoState = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  
  
  
  const getFonts = async () => {
    await Font.loadAsync({
      Beiruti: require('../assets/fonts/Beiruti.ttf'),
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    getFonts().then(() => {
      SplashScreen.hideAsync();
    });
    
  }, []);
    const styles = StyleSheet.create({
        title: {
            marginTop: 30,
            fontSize: 35,
            textAlign: 'left',
            
            fontWeight: 'bold',
            marginBottom: 20,
        },
        container: {
          flex: 1,
          alignItems: 'center',
          width: '100%',
          
          
        
        },
        nameinput : {
          flexDirection: 'row',
          height: 60,
          width: '80%',
          backgroundColor: 'rgba(225,204,23,0.6)',
          borderColor: 'black',
          borderWidth: 2,
          borderBottomColor: '#6ABF0A',
          borderTopLeftRadius: '10%',
          borderTopRightRadius: '10%',
        },
        submit : {
          flex: 0.7,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          
          width: '90%',
          marginTop: 80,
        }


        
    })
    if (!fontsLoaded) {
      return null;
    }
    // const register = async (email,password, firstName, lastName ,age,state , city, phoneNumber ) => {
    //const UserInput = forwardRef(({ uinfo = false,show = true,icon: IconComponent = DefaultIcon, height = 70, width = '90%', ...props }, ref) => {
  return (
    
    <SafeAreaView style = {{alignItems: 'center', flex: 1, width: '100%'}} >
      <StatusBar style = "dark" />
        
        <Text style = {styles.title} >Last Bit...</Text>
        
        <Image source = {require('../assets/cake.png')} style = {{height: 200, width: 200, marginVertical: 40,}} />
        
        <View style = {styles.container}>
        
        <Button title = "Set Birthday" />
        <Picker
      onValueChange={(value) => console.log(value)}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
    />
        
        <View style = {styles.submit}>
        <TouchableOpacity >
        <Back name = 'arrow-left-circle' size = {50} style = {{color: 'black', }} />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => navigation.navigate("stateinfo")} >
        <Check name = 'check-circle-fill' size = {110} style = {{color: '#2DE371', marginLeft: 50, marginRight: 90,}} />
        </TouchableOpacity>
        </View>
        

        </View>
        
    </SafeAreaView>
  )
}

export default UserInfoState;

