import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image , TouchableOpacity, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './(app)/Home';
import Home2 from './(app)/Home2';
import Details from './(app)/details';
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



SplashScreen.preventAutoHideAsync();

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
                  let iconName;
                  if (route.name === 'home') {
                      iconName = 'mosque';
                      const IconComponent = focused ? MaterialIcons : MaterialCommunityIcons;
                      return <IconComponent name={iconName} size={size} color={color} style={styles.icon} />;
                  } else if (route.name === 'settings') {
                      iconName = 'person' + (focused ? '' : '-outline');
                      return <MaterialIcons name={iconName} size={size} color={color} style={styles.icon} />;
                  }
              },
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'gray',
              tabBarActiveBackgroundColor: '#bed558',
              tabBarStyle: styles.tabBar,
              lazy: false,
          })}
          initialRouteName='home'
      >
      <Tab.Screen
        name='home'
        component={Home}
        options={{ headerTitle: (props) => <Hheader {...props} name={name} /> ,
                    }}
        
      />
      <Tab.Screen
        name='settings'
        component={Home2}
        options={{ title: 'My Settings' }}
      />
    </Tab.Navigator>
  );
}



export default function App() {
  return (
    <React.StrictMode>
      <ModalProvider>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
      </ModalProvider>

    </React.StrictMode>
  );
}
