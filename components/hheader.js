import HijriJS from "../assets/Hijri";
import {View, Text, StyleSheet} from 'react-native'
import Settingsicon from './settingsicon';
export default function Hheader(props) {
    
    let date = HijriJS.today().toString()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            

        },
        text: {
            
            fontSize: '20em',
            
            zIndex: 3,
            marginLeft: 80,
            marginRight: 40,
            
            
        },
        date: {
            
            fontSize: '10em',
            
            
        }, 
        settings: {
            height: 10,
            width: 10,
            margin: 10
        }

    })
    
    return (
        <View style = {styles.container} >
            <Settingsicon style = {styles.settings} />
            <Text style = {styles.text}>Welcome, {props.name}!</Text>
            <Text style = {styles.date}> {date}</Text>
        </View>
    )
        
}