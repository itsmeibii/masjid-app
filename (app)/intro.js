import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import UserInput from '../components/input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useModal } from '../context/AuthContext'
import { Platform } from 'react-native'

const Intro = (props) => {
    const {setModal, name, setName} = useModal()
    const [loading,setLoading] = useState(false);
    const [values, setValues] = useState({
        fname: '',
        lname: '',
        email: '',
      });
    const styles = StyleSheet.create({
        inputs: {
            marginVertical: 35,
        }
    })
    const handleInputChange = (name, value) => {
        setValues({
          ...values,
          [name]: value,
        });
      };

    async function handleSubmit () {
        let {fname, lname, email} = values;
            if (fname && lname && email) {
                setName(fname);
                await AsyncStorage.setItem('fname', fname);
                await AsyncStorage.setItem('lname', lname);
                await AsyncStorage.setItem('email', email);
            }
        
        
    }
    

  return (
    <View style = {{flex:1, alignItems: 'center'}} >
        <Text style = {{fontSize: 35, fontWeight: 'bold', marginVertical: 60, marginHorizontal: 30,}} >We want to know more about you...</Text>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <UserInput placeholder = 'First Name' style = {styles.inputs} value = {values.fname}  onChangeText={(value) => handleInputChange('fname', value)}/>
        <UserInput placeholder = 'Last Name' style = {styles.inputs} value = {values.lname} onChangeText={(value) => handleInputChange('lname', value)}/>
        <UserInput placeholder = 'Email' style = {styles.inputs} value = {values.email} onChangeText={(value) => handleInputChange('email', value)}/>
        </KeyboardAvoidingView>
        {loading ? (
            <ActivityIndicator size = 'small' color = "green"/>
        ) : (
            <TouchableOpacity style = {{width: '100%', alignItems: 'center', marginTop: 25,}} onPress = {async () => {
                try {
                    setLoading(true);
                    await handleSubmit();
                    setLoading(false);
                    setModal(false)
                    
                    
                }  catch (e) {
                    Alert.alert(e);
                }
                    
                
            }} >
                <View style = {{height: 70, width: '70%', backgroundColor: '#2DE371', borderRadius: 15,  justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 25, color: 'white', fontWeight: 800,}}>Lets get started!</Text>
                </View>
            </TouchableOpacity>
        )}
        
    </View>
  )
}

export default Intro


