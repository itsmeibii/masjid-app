import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Button, Platform, SafeAreaView, StyleSheet, View} from 'react-native'

import {Agenda} from 'react-native-calendars';
import MasjidDropdown from "../components/MasjidDropdown";
import * as Location from 'expo-location';

import { Modal } from 'react-native';
import Intro from './intro';
import Hheader from '../components/hheader';
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useModal } from '../context/AuthContext';



SplashScreen.preventAutoHideAsync();
export default function Home({navigation})
{
    const {name, setName} = useModal()
    const [location, setLocation] = useState(undefined);
    const [date, setDate] = useState(new Date());
    const [selected,setSelected] = useState(false)
    

    const [items, setItems] = useState({});
   const styles = StyleSheet.create({
    safe: {
        flex: 1,
        alignItems: 'center',
        
    },
    
    container : {
        top: 20,
        flex: 0.4,
        width: '90%',
        backgroundColor: 'grey',
        borderRadius: '10',
        
        justifyContent: 'center',
        alignItems: 'center',
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
    text : {
        fontSize: 24,
        color: 'black',
    }
   })
    function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}
const {modal, setModal} = useModal();
  
  async function loadName () {
    
    try {
        
        let temp = await AsyncStorage.getItem('fname');
    if (!!temp) {
        setName(temp);
        return true;
    } else {
        return false;
    }
    } catch (e) {
        return false;
    }
    
    
}

useEffect(() => {
  async function initialize() {
    try {
      const found = await loadName();
      setModal(!found); // Show modal if name is not found
    } catch (e) {
      console.error('Error in loadName:', e);
      setModal(true); // Show modal on error
    } finally {
      SplashScreen.hideAsync(); // Ensure splash screen hides
    }
  }

  initialize();
},[])
useEffect(() => {
  navigation.setOptions({
    headerTitle: (props) => <Hheader {...props} name={name} />,
  });
}, [name]);


useEffect(() => {
    

    const checkPermissions = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status === 'granted') {

            // Fetch location if permission is granted
            const { coords } = await Location.getCurrentPositionAsync({});
            setLocation(coords);
            console.log(coords);
        } else {
            // Request permission if not granted
            const { status: newStatus } = await Location.requestForegroundPermissionsAsync();

            if (newStatus === 'granted') {
                const { coords } = await Location.getCurrentPositionAsync({});
                setLocation(coords);
                console.log(coords);
            } else {
                setLocation(null);
            }
        }
    };
    checkPermissions();

    

},[])


const loadItems = (day) => {


        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            day: strTime
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems)
        }, 1000);
};
   return (

    <SafeAreaView style = {[styles.safe, {marginVertical: 0,}]} >
        
        <Modal visible = {modal} onRequestClose = {() => setModal(false)} animationType = "slide" presentationStyle="pageSheet" >
            
                <Intro ></Intro>
            
        </Modal>
        <View style = {{width: '100%', flex: 0.2}} >
        {location == undefined ? (
        <ActivityIndicator size = 'small' color = 'green' />
        ) : (
        <MasjidDropdown  loc ={location}/>
        )
        }
        </View>
        <View style = {styles.container} />
        <View style = {{flex:1, width: '90%', marginTop: 50,marginBottom: 30, borderRadius: 50, backgroundColor: 'yellow'}}>
        <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            selected={'2017-05-16'}

            />
        </View>


    </SafeAreaView>

   );
}