import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image , TouchableOpacity, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './Home';
import Home2 from './Home2';
import Details from './details'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HijriJS from './Hijri';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Hheader from './hheader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function Mainnav () {
  const styles = StyleSheet.create({
    icon: {
      borderRadius: 50,
    }
  })
  const stack = createBottomTabNavigator();
  return (
    <stack.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name == 'home') {
          iconName = focused ? 'home' : 'home-outline';
          return <Ionicons name = {iconName} size = {size} color = {color} style = {styles.icon} />
        } else if (route.name == 'home2') {
          iconName = 'mosque';
          if (focused) {
            return <MaterialIcons name = {iconName} size = {size} color = {color} style = {styles.icon} />
          } else {
            return <MaterialCommunityIcons name = {iconName} size = {size} color = {color} style = {styles.icon} />
          }
        }

        // You can return any component that you like here!
        
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
      tabBarActiveBackgroundColor: '#bed558',
      
      lazy: false,
      tabBarItemStyle: {borderTopLeftRadius: 30, borderTopRightRadius: 30,},

    })}
    
    
    
    initialRouteName = 'home'>
      <stack.Screen name = 'home' component={Home} options =  {{headerTitle: (props) => <Hheader {...props} name = 'Ibrahim' />}} />
        <stack.Screen name = 'home2' component={Home2} options = {{title: 'My Masjid'}} />
    </stack.Navigator>
  )
}

export default function App() {
  
  const nstack = createNativeStackNavigator();
  
  
  
  return (
    <NavigationContainer>
      <nstack.Navigator initialRouteName = 'nav'>
      <nstack.Screen name = 'details' component={Details} options = {{
          title: 'Settings',
          headerShown : true,
          headerTintColor:'green',
        }}/>
        <nstack.Screen name = 'nav' component={Mainnav} options = {{headerShown: false,}} />
      </nstack.Navigator>
    </NavigationContainer>
  );
}


