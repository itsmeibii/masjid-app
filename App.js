

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './(app)/Home';
import Event from './(app)/Event';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { ModalProvider, useModal } from './context/AuthContext';

import { PaperProvider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';

import ErrorBoundary from './components/ErrorBoundary';

import Toast from 'react-native-toast-message';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function MainNav() {
  
 
  
  
    

  return (
      <Tab.Navigator

          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused,_, size }) => {
                  
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
          initialRouteName='Home'
      >
      <Tab.Screen
        name='Home'
        component={Home}
        
        
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
    RobotoFlexMED: require('./assets/fonts/RobotoFlex-MED.ttf'),
    RobotoFlexEL: require('./assets/fonts/RobotoFlex-EL.ttf'),
  })
  if (!loaded) {
    return null;
  }
  
  return (
    <ErrorBoundary>
    
     <PaperProvider>
      <ModalProvider>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
      </ModalProvider>
      </PaperProvider>
      <Toast />
      </ErrorBoundary>

    
  );
}
