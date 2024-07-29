import React, {useEffect, useState} from 'react'
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native'

import {Agenda} from 'react-native-calendars';
import MasjidDropdown from "../components/MasjidDropdown";
import * as Location from 'expo-location';
import {auth} from '../backend/functions/firebaseConfig'
import {signInAnonymously, getIdToken} from 'firebase/auth';


export default function Home(props)
{
    const [location, setLocation] = useState(null);
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
useEffect(() => {
    if (!auth.currentUser) {
        signInAnonymously(auth).then(() => {
            console.log('signed in anonymously');
        }).catch((e) => {
            console.log(`ERROR ${e}`);
        });
    }

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
            }
        }
    };
    checkPermissions();

    return auth.onAuthStateChanged(async (user) => {
        try {
            if (user) {
                console.log('fetching....')
                const token = await getIdToken(user);
                //const response = await fetch('https://api-bkrf4j3bwa-uc.a.run.app/maps/nearby?lat=34.075956&lng=-84.352815');
                const response = await fetch ("https://api-bkrf4j3bwa-uc.a.run.app", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    //const data = await response.json();
                    console.log(response);
                } else {
                    console.log(`error fetching data ${response.status}`);
                }
            }
        } catch (e) {
            console.log(e);
        }

    });

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

    <SafeAreaView style = {[styles.safe, {marginVertical: 20,}]} >
        <View style = {{width: '100%', flex: 0.2}} >
        <MasjidDropdown  loc ={location ?? 'yeah'}/>
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