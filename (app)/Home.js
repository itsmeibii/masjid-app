
import React, {useEffect, useState} from 'react'
import {Button, Text, View, StyleSheet, SafeAreaView, Platform, Vibration} from 'react-native'

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import MasjidDropdown from "../components/MasjidDropdown";
import ScreenWrapper from "../components/ScreenWrapper";





export default function Home(props)
{
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
    setInterval(() => {
        Vibration.vibrate();
    },100)
})


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
        <MasjidDropdown  />
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