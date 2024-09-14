import { Image, StyleSheet, Text, View, Alert, Linking, Pressable, TouchableOpacity, Platform} from 'react-native'
import React, {useState} from 'react'
import { setStatusBarHidden } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome6'
import * as Clipboard from 'expo-clipboard'
import Feather from 'react-native-vector-icons/Feather'
import { IconButton } from 'react-native-paper'

const MosqueInfo = ({mosque, close}) => {
    const Break = () => {
        return <View  style = {{width: '90%', height: 1, backgroundColor: '#e1e1e1', borderRadius: 1, marginVertical: 5}}/>    
    }
    async function copyToClipboard(text) {
        await Clipboard.setStringAsync(text);
        Alert.alert('Copied to clipboard');
    }
    const openURL = async () => {
        const supported = await Linking.canOpenURL(mosque.website);
        if (supported) {
          Linking.openURL(mosque.website);
        } else {
          Alert.alert('Error', "Can't open this URL");
        }
      };
const styles = StyleSheet.create({
    image: {
        
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: 200,
        width: '100&'
    },
    details: {
        alignItems: 'center',
        
    }, 
    shadow : {
        ...Platform.select({
            android: {
                elevation: 5,
            },
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            default : {}
        }),
    },
    detail :{
        flexDirection: 'row',
        height: 50,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 15,
    }
})
if (!mosque) {
    return null;   
}
  return (
    <View style = {{flex: 1}}>
        <View style = {styles.image} >
        <Image source = {{uri: mosque.imageURL}} style = {{height: '100%', width: '100%'}} />
        </View>
        <View style = {styles.title} >
            <Text style = {{fontSize: 25, fontWeight: '600', color: 'black', marginLeft: 15, marginTop: 30,}}>{mosque.Masjid}</Text>
        </View>
        <View style = {styles.details} >
            <View style = {styles.detail} >
                <Icon  name = 'location-dot' size = {20} color = 'black' style = {{marginLeft: 10,}} />
                <Text style = {{fontSize: 17, fontWeight: '400', color: 'black', marginLeft: 15,}}>{mosque.address}</Text>
            </View>
            <Break />
            {mosque?.distance ? (
                <>
                <View style = {[styles.detail]} >
                <Icon name = 'car-side' size = {20} color = 'black' style = {{marginLeft: 10,}} />
                <Text style = {{fontSize: 17, fontWeight: '400', color: 'black', marginLeft: 15,}}>{mosque.distance}   ({mosque.duration})</Text>
            </View>
            <Break />
            </>
            ) : null}
            
            <View style = {[styles.detail]} >
                <Icon name = 'phone' size = {20} color = 'black' style = {{marginLeft: 10,}} />
                <Text style = {{fontSize: 17, fontWeight: '400', color: 'black', marginLeft: 15,}}>{mosque.phone}</Text>
                <IconButton mode = 'outlined' icon = {() => <Feather name = 'copy' size = {20} color = 'black' />} onPress = {async () => await copyToClipboard(mosque.phone)} />
                </View>
            <Break />
            <View style = {[styles.detail]} >
                <Icon name = 'globe' size = {20} color = 'black' style = {{marginLeft: 10,}} />
                <Pressable onPress = {async () => await openURL()}>
                <Text style = {{fontSize: 17, fontWeight: '600', color: '#398cd4', marginLeft: 15, textDecorationLine: 'underline' }}>{mosque.website}</Text>
                </Pressable>
            </View>
        </View>
        <View style = {{width: '100%', alignItems: 'center', justifyContent: 'center', }} >
        <IconButton icon = {() => (
            <Image source = {require('../assets/gmaps.jpg')} style = {{height:45, width: 45,}}/>
        )} size = {60} mode = 'outlined' containerColor='white'
        onPress = {async() => {
            const url = `https://www.google.com/maps/search/?api=1&query=${mosque.Masjid.split(' ').join('+')}`
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              Linking.openURL(url);
            } else {
              Alert.alert('Error', "Something went wrong while opening Google Maps");
            }
        }}
        />
        </View>
        <TouchableOpacity style = {[styles.shadow,{height: 60, width: '90%', backgroundColor: '#38f25a', borderRadius: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20,}]} onPress = {() => close()}  >
            <Text style = {{fontSize: 30, fontWeight: '900', color: 'white', textAlign: 'center', marginVertical: 10,}}>Done</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MosqueInfo

