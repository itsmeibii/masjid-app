import {    TouchableOpacity, SafeAreaView,StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
import Check from 'react-native-vector-icons/Octicons'
import Back from 'react-native-vector-icons/Feather'
import * as SplashScreen from 'expo-splash-screen'
import  Picker  from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const UserInfoState = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [citiesLoaded, setCitiesLoaded] = useState(null);
  
  let listofcities = ['hello'];
  
  


  const getFonts = async () => {
    await Font.loadAsync({
      Beiruti: require('../assets/fonts/Beiruti.ttf'),
    });
    setFontsLoaded(true);
  };
  const fetchCities = async () => {
    setTimeout(async () => {
      try {
        const response = await fetch('https://parseapi.back4app.com/classes/Usabystate_GA?limit=387&keys=name',
          {
            headers: {
              'X-Parse-Application-Id': 'LgnEeMN5kRMlLUuhAe2Lgv8rGamc0SjC2GbmNhCq', // This is your app's application id
              'X-Parse-REST-API-Key': 'oSmFgcDjU7BjTakDfwH7b724B96vwTAtW45Gn3xy', // This is your app's REST API key
            }
          });
    const data = await response.json();
    
    const cities = data.results.map(obj => {
      return obj.name;
    })
    const formatted = cities.map(city => {
      return {
        label: city,
        value: city,
      }
    });
    console.log(formatted.slice(0,3))
    listofcities = formatted;
      } catch (e) {
        console.error(e);
      }
    }, 5000)
    
    
  }
  useEffect( () => {
    getFonts().then(() => {
      SplashScreen.hideAsync();
    });

    //logic for cities loading
    setCitiesLoaded(false);
    
    fetchCities()
    
    setCitiesLoaded(true);

    
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
        },
        inputIOS : {
          backgroundColor: '#DFDFDF',
          fontSize: 16,
          
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: '10%',
          color: 'black',
          
          textAlign: 'center', // center text for iOS
          height: '100%',
        
          
          
        },
        //#DFDFDF
        placeholder: {
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          paddingRight: 10,
        },
        stateplaceholder: {
          color: 'rgba(0,0,0,0.5)',
          fontSize: 18,
          fontWeight: 'bold',
          
        },
        cities: {
          
           
          },
          locinput: {
            width: '90%', 
            flex: 0.25,
            borderRadius: '10%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          },



        
    })
    if (!fontsLoaded) {
      return null;
    }
    // const register = async (email,password, firstName, lastName ,age,state , city, phoneNumber ) => {
    //const UserInput = forwardRef(({ uinfo = false,show = true,icon: IconComponent = DefaultIcon, height = 70, width = '90%', ...props }, ref) => {
  return (
    
    <SafeAreaView style = {{alignItems: 'center', flex: 1, width: '100%'}} >
      <StatusBar style = "dark" />
        <Button title = "press me mofo" onPress = {() => fetchCities()} />
        <Text style = {styles.title} >Last Bit...</Text>
        
        <Image source = {require('../assets/pin.png')} style = {{height: 200, width: 200, marginVertical: 40,}} />
        
        <View style = {styles.container}>

          <View style = {styles.locinput}>
        
        <View style = {{width:'65%'}}>
        {citiesLoaded? ( 
          <Picker
      onValueChange={(value) => console.log(value)}
      disabled = {!true}
      placeholder = {{label: 'Select a City', value: null}}
      Icon = {() => {
        return <Icon name = "arrow-down-drop-circle" size = {30} color = "black" />
      }}
      
      items={[]} style={{
        inputIOS: styles.inputIOS,
        inputAndroid: styles.inputAndroid,
        placeholder: styles.placeholder,
        iconContainer: {
          top: 25,
          right: 12,
        }
      }}
    />
        ) : (
          <ActivityIndicator size = "large" />
        )
      }
    </View>
    <View style = {{width: '25%',}}>
        <Picker
      onValueChange={(value) => console.log(value)}
      disabled = {true}
      placeholder = {{label: 'GA', value: "GA"}}
      Icon = {() => {
        return <Icon name = "arrow-down-drop-circle" size = {30} color = "rgba(0,0,0,0.5)" />
      }}
      
      items={[
        
      ]} style={{
        inputIOS: [styles.inputIOS, {textAlign: 'left', paddingLeft: 10,}],
        inputAndroid: styles.inputAndroid,
        placeholder: styles.stateplaceholder,
        iconContainer: {
          top: 23,
          right: 12,
        }
      }}
    />
    </View>
    </View>
    
    



    
        
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

