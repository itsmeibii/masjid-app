import { StyleSheet, Text, View , Pressable} from 'react-native'
import React from 'react'
import {Ionicons,AntDesign, FontAwesome5} from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';



const icons = {
    Home: (props) => <AntDesign name = 'home'  size = {20} {...props} />,
    Events: (props) => <Ionicons name = 'calendar-outline'  size = {20} {...props} />,
    Qibla: (props) => <FontAwesome5 name = 'kaaba'  size = {20} {...props} />,
    
}


const TabBarLabel = (props) => {
    const {isFocused, routeName, label, color} = props;
    const scale = useSharedValue(0);
    React.useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {duration: 350});
    }, [scale, isFocused])
    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [0.8, 1.2]);
        return {
            transform: [{scale: scaleValue}]
        }
    })
  return (
    <Pressable {...props} style = {{flex: 1, justifyContent: 'center', alignItems: 'center', height: 30, }} >
        <Animated.View style = {[animatedIconStyle]}>
        {
                    icons[routeName]({color})
                }
        </Animated.View>
    
      
                <Text style={{ color, fontWeight: 'bold', marginTop: 5,  fontSize: 11,}}>
                  {label}
                </Text>
    
    </Pressable>
  )
}

export default TabBarLabel

const styles = StyleSheet.create({})