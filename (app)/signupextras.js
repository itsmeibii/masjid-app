import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import UserInput from '../components/input'

const SignupExtras = () => {
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
          width: '85%',
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: '10%',
        
        },
        person_icon : {
          position: 'absolute',
          height: 10,
          width: 10,
        }
    })
    // const register = async (email,password, firstName, lastName ,age,state , city, phoneNumber ) => {
    //const UserInput = forwardRef(({ uinfo = false,show = true,icon: IconComponent = DefaultIcon, height = 70, width = '90%', ...props }, ref) => {
  return (
    
    <SafeAreaView style = {{alignItems: 'center', flex: 1, width: '100%'}} >
        
        <Text style = {styles.title} >Just a Few More Things...</Text>
        <Image source = {require('../assets/person.png')} style = {styles.person_icon} />
        <View style = {styles.container}>
          <View style = {{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <UserInput placeholder = "First Name" uinfo height = {30} width = '40%' fontSize = {9}/>
          <UserInput placeholder = "Last Name" uinfo height = {30} width = '40%' />
          </View>
        </View>
        
    </SafeAreaView>
  )
}

export default SignupExtras

