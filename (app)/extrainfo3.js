import {    TouchableOpacity, SafeAreaView,StyleSheet, Text, View, Image, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
import Check from 'react-native-vector-icons/Octicons'
import Back from 'react-native-vector-icons/Feather'
import * as SplashScreen from 'expo-splash-screen'
import  Picker  from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import UserInput from '../components/input'
import { useAuth } from '../context/AuthContext'

const UserInfoState = ({route, navigation}) => {
  const state = 'GA';

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [citiesLoaded, setCitiesLoaded] = useState(false);
  const [listofcities, setListofcities] = useState([]);
  const [city, setCity] = useState(null);
  const [number, setNumber] = useState(null);
  const {register} = useAuth();
  function phoneFormat(input){
    // Strip all characters from the input except digits
    input = input.replace(/\D/g,'');
    
    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0,10);

    // Based upon the length of the string, we add formatting as necessary
    var size = input.length;
    if(size == 0){
            input = input;
    }else if(size < 4){
            input = '('+input;
    }else if(size < 7){
            input = '('+input.substring(0,3)+') '+input.substring(3,6);
    }else{
            input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
    }
    return input; 
}
  
  


  const getFonts = async () => {
    await Font.loadAsync({
      Beiruti: require('../assets/fonts/Beiruti.ttf'),
    });
    setFontsLoaded(true);
  };
  //email,password, firstName, lastName ,age,state , city, phoneNumber
  const handleRegister = async (email,password, firstName, lastName ,age,state , city, phoneNumber) => {
    
      const response = await register(email,password, firstName, lastName ,age,state , city, phoneNumber);
      if (!response.success) {
        Alert.alert(response.msg);
      } else {
        console.log("success!")
      }
    
  }

  const fetchCities = async () => {
    
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
    setListofcities(formatted)
    setCitiesLoaded(true);
      } catch (e) {
        console.error(e);
        setCitiesLoaded(false);
      }
    
    
    
  }
  useEffect( () => {
    getFonts().then(() => {
      SplashScreen.hideAsync();
    });

    //logic for cities loading
    
    
    fetchCities()
    
    

    
  }, []);
    const styles = StyleSheet.create({
        title: {
            marginTop: 30,
            fontSize: '35vw',
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
          
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: '10%',
          color: 'black',
          
          textAlign: 'center', // center text for iOS
          height: '100%',
          fontSize: 20,
          fontWeight: 'bold',
          
          
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
            flex: 0.2,
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
        
        <Text style = {styles.title} >Last Bit...</Text>
        
        <Image source = {require('../assets/pin.png')} style = {{height: 100, width: 100, marginVertical: 10,}} />
        
        <View style = {styles.container}>

          <View style = {styles.locinput}>
        
        <View style = {{width:'65%'}}>
        {citiesLoaded? ( 
          <Picker
      onValueChange={(value) => setCity(value)}
      placeholder = {{label: 'Select a City', value: null}}
      Icon = {() => {
        return <Icon name = "arrow-down-drop-circle" size = {30} color = "black" />
      }}
      
      items={listofcities} style={{
        inputIOS: styles.inputIOS,
        inputAndroid: styles.inputAndroid,
        placeholder: styles.placeholder,
        iconContainer: {
          top: 20,
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
      onValueChange={(value) => 
        null
      }
      disabled
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
          top: 20,
          right: 12,
        }
      }}
    />
    </View>
    </View>
    <Image source = {require('../assets/phone.png')} style = {{height: 100, width: 100, marginVertical: 40,}} />
    <KeyboardAvoidingView behavior= {Platform.OS == 'ios' ? 'padding' : 'height' }>
    <UserInput  returnKeyType='done' keyboardType = 'numeric' onChangeText = {(num) =>  setNumber(num)} value = {phoneFormat(number || "")} style = {{marginBottom: 5}} />
    <Text style = {{textAlign: "right", fontSize: 10, color: 'gray'}}>Valid US Phone Numbers Only</Text>
    </KeyboardAvoidingView>
    
    



    

        <View style = {styles.submit}>
        <TouchableOpacity onPress = {() => navigation.navigate("ageinfo") } >
        <Back name = 'arrow-left-circle' size = {50} style = {{color: 'black', }} />
        </TouchableOpacity>
        <TouchableOpacity onPress = {async () =>{
          const {email,password, fname, lname ,bday} = route.params;
           await handleRegister(email,password,fname,lname,bday,state,city,number);
          }
          }  >
        <Check name = 'check-circle-fill' size = {110} style = {{color: '#2DE371', marginLeft: 50, marginRight: 90,}} />
        </TouchableOpacity>
        </View>
        

        </View>
        
    </SafeAreaView>
  )
}

export default UserInfoState;

