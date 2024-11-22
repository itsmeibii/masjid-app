import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import { useModal } from '../context/AuthContext';
import EventTable from '../components/EventTable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Event(props) {
    let insets = useSafeAreaInsets();
    const { events, isAppReady, mosqueData } = useModal();
    const [colors, setColors] = React.useState({});
    useEffect(() => {
        if (mosqueData) {
            let color = {};
        for (let i of mosqueData) {
          color[i.abr] = i.color;
        }
        setColors(color);
        }
    }, [mosqueData])
    
    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingTop: insets.top,
            paddingBottom: insets.bottom - 10,
        },
        text: {
            fontSize: 24,
            color: 'black',
        },
    });

    if (!isAppReady) {
        return <ActivityIndicator size="large" color="green" />;
    } else if (!mosqueData) {
        return <ActivityIndicator size="large" color="green" />;
      }
      if (!events) {
        return <ActivityIndicator size="large" color="green" />;
      }

    return (
        <View style={styles.container}>
            
            <View style = {{height: 30, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15, backgroundColor: 'white'}}>
            <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 24}}> My Events </Text>
            </View>
            <View style = {{width: '100%', flex: 1,  }}>
            <EventTable events={events} prayerData = {mosqueData} colors = {colors} />
            </View>
            
            
        </View>
    );
}
