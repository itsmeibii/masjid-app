import { SafeAreaView, StyleSheet, Text, View , Image, Keyboard, Button, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import UserInput from '../components/input';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import Check from 'react-native-vector-icons/Octicons'
import Back from 'react-native-vector-icons/Feather'
import DateTimePickerModal from 'react-native-modal-datetime-picker'


const UserInfoAge = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
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
        
        <Text style = {styles.title} >When does the cake come out?</Text>
        
        <Image source = {require('../assets/cake.png')} style = {{height: 200, width: 200, marginVertical: 40,}} />
        
        <View style = {styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
        </Text>
        <Button title = "Set Birthday" onPress = {showDatePicker} />
        <DateTimePickerModal
        date={selectedDate || new Date()}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        />
        <View style = {styles.submit}>
        <TouchableOpacity onPress = {() => selectedDate ? navigation.navigate("nameinfo") : Alert.alert("Please enter a birthdate")}>
        <Back name = 'arrow-left-circle' size = {50} style = {{color: 'black', }} />
        </TouchableOpacity>
        <TouchableOpacity >
        <Check name = 'check-circle-fill' size = {110} style = {{color: '#2DE371', marginLeft: 50, marginRight: 90,}} />
        </TouchableOpacity>
        </View>
        

        </View>
        
    </SafeAreaView>
  )
}

export default UserInfoAge

