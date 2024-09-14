import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { useModal } from '../context/AuthContext';
import EventTable from '../components/EventTable';
import TableSkeleton from '../components/TableSkeleton';
import EventSearch from '../components/EventSearch';
import { Picker } from 'react-native';

export default function Event(props) {
    
    const { events, isAppReady, mosqueData } = useModal();

    
    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        text: {
            fontSize: 24,
            color: 'black',
        },
    });

    if (!isAppReady) {
        return <TableSkeleton />;
    } else if (!mosqueData) {
        return <ActivityIndicator size="large" color="green" />;
      }

    return (
        <SafeAreaView style={styles.container}>
            
            <View style = {{height: 30, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15, backgroundColor: 'white'}}>
            <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 24}}> My Events </Text>
            </View>
            <View style = {{width: '100%', flex: 1, }}>
            <EventTable events={events} prayerData = {mosqueData} />
            </View>
            
            
        </SafeAreaView>
    );
}
