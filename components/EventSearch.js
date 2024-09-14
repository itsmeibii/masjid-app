import { StyleSheet, Text, View, TextInput, Animated, Easing, TouchableOpacity } from 'react-native'
import React, {useState, useRef} from 'react'
import Feather from '@expo/vector-icons/Feather';
import { Menu } from 'react-native-paper';
import { useModal } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventSearch = ({setValue}) => {
    const [focused, setFocused] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;  // Animated value for rotation
    const [visible, setVisible] = useState(false);
    
    
    async function handleFilter(filter) {
        setValue(filter);
        setVisible(false);
        await AsyncStorage.setItem('filter', filter);
        
       
    }
  // Function to rotate the icon with easing
  const rotateIcon = () => {
    Animated.timing(rotation, {
      toValue: 1,  // Rotate to 1 (mapped to 45 degrees)
      duration: 500,  // Duration of animation
      easing: Easing.out(Easing.ease),  // Easing function
      useNativeDriver: true,  // Use native driver for better performance
    }).start();
  };

  // Function to reset rotation when TextInput loses focus
  const resetRotation = () => {
    Animated.timing(rotation, {
      toValue: 0,  // Reset to 0
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // Interpolating rotation value for smooth transformation
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-45deg'],  // From 0 to 45 degrees
  });
  return (
    
    <View style = {{flexDirection: 'row', height: 44, width: 353, justifyContent: 'space-between'}} >
    <View style = {{flexDirection: 'row',height: '100%', width: 300, borderRadius: 100, backgroundColor: 'rgba(118,118,128,0.12)', alignItems: 'center' }}>
        <Animated.View style = {[{marginLeft: 12, marginRight: 8,}, {transform: [{rotate: rotateInterpolate}]}]}>
      <Feather name="search" size={24} color="rgba(0,0,0,0.6)" />
      </Animated.View>
    <TextInput autoCapitalize='none' placeholder = 'Search Events'  style = {{height: 20, width: 244, fontFamily: 'RobotoFlexMED', fontSize: 17,}} onFocus = {rotateIcon} onBlur = {resetRotation}/>
    </View>

    
    <Menu 
    visible = {visible}
    contentStyle = {{backgroundColor: 'white', borderRadius: 10, }}
    onDismiss = {() => setVisible(false)}
    anchorPosition='bottom'
    anchor = {(
        <TouchableOpacity onPress = {() => setVisible(true)}>
        <View style = {{height: 44, width: 44, borderRadius: 22, backgroundColor: 'rgba(118,118,128,0.12)', justifyContent: 'center', alignItems: 'center'}}>
        <Feather name = "filter" size = {24} color = "rgba(0,0,0,0.6)" />
        </View>
    </TouchableOpacity>
  )}
    
    >
        
        <Menu.Item onPress = {async () => {await handleFilter('Masjid')}} title = "Sort by Closest Masjid" />
        <Menu.Item onPress = {async () => {await handleFilter('Time')}} title = "Sort by Time" />
    </Menu>
    </View>
    
  )
}

export default EventSearch

const styles = StyleSheet.create({})