import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image , TouchableOpacity, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './(app)/Home';
import Event from './(app)/Event';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import HijriJS from './assets/Hijri';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Hheader from './components/hheader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Intro from './(app)/intro';
import { ModalProvider, useModal } from './context/AuthContext';
import * as SplashScreen from 'expo-splash-screen'
import { PaperProvider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';





const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function MainNav() {
 const {name, setName} = useModal();
  
  const styles = StyleSheet.create({
    icon: {
      borderRadius: 50,
    },
      tabBar: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,

          overflow: "hidden",
          backgroundColor: '#fff',
      }
  });
    

  return (
      <Tab.Navigator

          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  
                if (route.name === 'Home') {
                  return <AntDesign name = 'home' color = {focused ? 'blue' : 'black'} size = {size} /> 
                } else {
                  return <Ionicons name = 'calendar-outline' color = {focused ? 'blue' : 'black'} size = {size} />
                }
              },
              
              //calendar-outline Ionicons
              //home antdesign
              
              lazy: false,
              headerShown: false,
          })}
          initialRouteName='Events'
      >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{ headerTitle: (props) => <Hheader {...props} name={name} /> ,
                    }}
        
      />
      <Tab.Screen
        name='Events'
        component={Event}
        options={{ title: 'My Events' }}
      />
    </Tab.Navigator>
  );
}



export default function App() {
  const [loaded] = useFonts({
    RobotoFlexSB: require('./assets/fonts/RobotoFlex-SB.ttf'),
    RobotoFlexREG: require('./assets/fonts/RobotoFlex-REG.ttf'),
    RobotoFlexBOLD: require('./assets/fonts/RobotoFlex-BOLD.ttf'),
    'RobotoFlexMED': require('./assets/fonts/RobotoFlex-MED.ttf'),
    RobotoFlexEL: require('./assets/fonts/RobotoFlex-EL.ttf'),
  })
  if (!loaded) {
    return null;
  }
  return (
     <PaperProvider>
      <ModalProvider>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
      </ModalProvider>
      </PaperProvider>

    
  );
}
