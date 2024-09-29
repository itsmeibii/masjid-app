import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { useModal } from '../context/AuthContext';
import Arrow from 'react-native-vector-icons/AntDesign';

const MosqueCard = ({mosqueData, onPress}) => {
  function timeUntil(timeString) {
    const now = new Date(); // Get current date and time
  
    // Regular expression to match time and optional space before AM/PM (case-insensitive)
    const timeRegex = /^(\d{1,2}):(\d{2})\s*([aApP][mM])$/;
    const match = timeString.match(timeRegex);
    
    if (!match) {
      throw new Error('Invalid time format');
    }
    
    // Extract hours, minutes, and AM/PM modifier
    let [_, hours, minutes, modifier] = match;
    hours = Number(hours);
    minutes = Number(minutes);
    modifier = modifier.toUpperCase(); // Normalize to uppercase AM/PM
    
    // Convert the 12-hour time to 24-hour format based on AM/PM
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
  
    // Create a Date object for the target time (today)
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);
  
    // Calculate the difference in milliseconds
    let timeDifference = targetTime - now;
  
    // If the target time is earlier than the current time, assume it's for the next day
    if (timeDifference < 0) {
      timeDifference += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
    }
  
    // Convert milliseconds to minutes
    const totalMinutes = Math.floor(timeDifference / (1000 * 60));
    const remainingHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
  
    // Build the output string based on the remaining time
    if (remainingMinutes === 0 && remainingHours > 0) {
      return `${remainingHours} hour${remainingHours > 1 ? 's' : ''} to go`;
    } else if (remainingHours > 0) {
      return `${remainingHours} hour${remainingHours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} to go`;
    } else {
      return `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} to go`;
    }
  }
  
  {/* intensity: 32 */}
  
  
  const {nextPrayer} = useModal();
  if (!mosqueData) {
    return null;
  }
  
  return (
    <TouchableOpacity onPress = {() => onPress()} activeOpacity={0.5} style = {{width: '100%', alignItems: 'center'}}>
    <View style = {{width: '90%', height: 240,borderRadius: 15, overflow: 'hidden', marginTop:25,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
      }})
    }}>
      
      <ImageBackground source= {{uri: mosqueData.imageURL}} style = {{width: '100%', height: '100%', flex: 1, justifyContent: 'space-between', alignItems: 'center', }} >
      <View style = {{overflow: 'hidden', width: 83, height: 51, borderRadius: 10,alignSelf: 'flex-end', margin: 10, }}>
        <BlurView intensity={Platform.OS === 'ios' ? 32 : 100} style = {{width: '100%', flex: 1, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', justifyContent: 'center', alignItems: 'center' }} >
          <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 13, color: 'white', marginBottom: 8}}>{nextPrayer.Time}</Text>
          <View style = {{alignItems: 'center'}}>
          <Text style = {{fontFamiyl: 'RobotoFlexMED', fontSize: 10, color: 'white', textAlign: 'center' }}>{timeUntil(nextPrayer.Time)}</Text>
          </View>
        </BlurView>
        </View>
        <BlurView intensity = {Platform.OS === 'ios' ? 32 : 100}  style = {{width: '100%', height: 68, blurRadius: 2, backgroundColor: 'rbga(255,255,255,0.12)', alignItems: 'center', flexDirection: 'row' , justifyContent: 'space-between'}}>
        <View style = {{width: 280, height: 43, justifyContent: 'space-around', alignItems: 'flex-start', marginLeft: 12, }} >
          <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 17, color: 'white', marginBottom: 8}}>{mosqueData['Masjid']}</Text>
          <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 13, color: 'white'}}>Next Prayer: {nextPrayer.Prayer}</Text>
          

          
        </View>
        
          <View style = {{  borderRadius: 22, height: 44, width: 44, backgroundColor: '#D9ED92', alignItems: 'center', justifyContent: 'center', marginRight: 20, }}>
            <Arrow name = 'arrowright' size = {25} color = 'black' />
          </View>
           
        </BlurView>

        </ImageBackground>
        
    </View>
    </TouchableOpacity>
  )
}

export default MosqueCard

const styles = StyleSheet.create({})