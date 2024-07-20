import { Alert, SafeAreaView, StyleSheet, Text, View , Image, TextInput, Keyboard, Button, TouchableOpacity} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import UserInput from '../components/input';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import Check from 'react-native-vector-icons/Octicons'
import Back from 'react-native-vector-icons/Feather'
import Person from 'react-native-vector-icons/FontAwesome6'
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default UserInfoName = ({route,navigation}) => {
  const [fwidth, setFwidth] = useState(3);
  const [lwidth, setLwidth] = useState(3);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const fnameref = useRef();
  const lnameref = useRef();
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
  const handleSubmit = () => {
    if (fname && lname) {
      navigation.navigate("ageinfo", {...route.params, fname, lname});
      console.log(route.params);
    } else  {
      Alert.alert('please fill all fields');
      !fname ? fnameref.current.focus() : lnameref.current.focus();
    }
    
  }
    const styles = StyleSheet.create({
        title: {
            marginTop: 10,
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
        <Text style = {styles.title} >Just a Few More Things...</Text>
        <Person name = 'person' size = {90} style = {{marginVertical: 10,}} />
        
        
        <View style = {styles.container}>
          <View style = {{marginTop: 21,flex: 0.15, flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: '25%'}} >
          <Text style = {{height: 53,fontSize: 50,marginHorizontal: 10, fontWeight: 'bold', }}>First</Text><Text style = {{margin: 0,fontSize: 20}}> name</Text>
          </View>
          <View style = {[styles.nameinput,{marginTop: 20, borderBottomWidth: fwidth,}]} >
          <TextInput ref = {fnameref} value = {fname} onChangeText = {text => setFname(text)} style = {{marginLeft: 20, fontSize: 30, fontFamily: 'Beiruti'}} placeholder = "First Name" onFocus = {() => setFwidth(width => width += 2)} onBlur = {()=> setFwidth(width => width -= 2)}/>
          </View>
          <View style = {{marginTop: 51,flex: 0.15, flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: '25%'}} >
          <Text style = {{height: 53,fontSize: 50,marginHorizontal: 10, fontWeight: 'bold', }}>Last</Text><Text style = {{margin: 0,fontSize: 20}}> name</Text>
          </View>
          <View style = {[styles.nameinput,{marginTop: 20, borderBottomWidth: lwidth,}]} >
          <TextInput  ref = {lnameref} value = {lname} onChangeText = {text => setLname(text)} style = {{marginLeft: 20, fontSize: 30, fontFamily: 'Beiruti'}} placeholder = "Last Name" onFocus = {() => setLwidth(width => width += 2)} onBlur = {()=> setLwidth(width => width -= 2)}/>
          </View>
        <View style = {styles.submit}>
        <TouchableOpacity onPress = {() => navigation.navigate('signuporig')}>
        <Back name = 'arrow-left-circle' size = {50} style = {{color: 'black', }} />
        </TouchableOpacity>
        <TouchableOpacity onPress = {handleSubmit}>
        <Check name = 'check-circle-fill' size = {110} style = {{color: '#2DE371', marginLeft: 50, marginRight: 90,}} />
        </TouchableOpacity>
        </View>
        

        </View>
        
    </SafeAreaView>
  )
}



