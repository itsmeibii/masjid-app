import HijriJS from "../assets/Hijri";
import {View, Text, StyleSheet} from 'react-native'
import Settingsicon from './settingsicon';
export default function Hheader(props) {
    const cdate = new Date();
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        // Get the formatted date string
        const dateString = date.toLocaleDateString('en-US', options);
        
        // Add the ordinal suffix for the day
        const day = date.getDate();
        const ordinalSuffix = (n) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        };
    
        return dateString.replace(day, `${day}${ordinalSuffix(day)}`);
    }
    let date = HijriJS.today().toString()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
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
            <Text style = {{fontSize: 9,}}> {formatDate(cdate)}</Text>
            <Text style = {{fontSize: 18, marginHorizontal: 32,}}>Welcome, <Text style = {{fontWeight: 'bold', color: 'green'}}>{props.name}!</Text></Text>
            <Text style = {{fontSize: 12,}}> {date}</Text>
        </View>
    )
        
}