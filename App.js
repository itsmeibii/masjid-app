import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image , TouchableOpacity, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './(app)/Home';
import Home2 from './(app)/Home2';
import Details from './(app)/details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import HijriJS from './assets/Hijri';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Hheader from './components/hheader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loginscreen from './(app)/loginscreen';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import SignupScreen from './(app)/signupscreen';
import SignupExtras from './(app)/signupextras';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainNav() {
  const styles = StyleSheet.create({
    icon: {
      borderRadius: 50,
    },
  });

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} style={styles.icon} />;
          } else if (route.name === 'home2') {
            iconName = 'mosque';
            if (focused) {
              return <MaterialIcons name={iconName} size={size} color={color} style={styles.icon} />;
            } else {
              return <MaterialCommunityIcons name={iconName} size={size} color={color} style={styles.icon} />;
            }
          }
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#bed558',
        lazy: false,
        tabBarItemStyle: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
      })}
      initialRouteName='home'
    >
      <Tab.Screen 
        name='home' 
        component={Home} 
        options={{ headerTitle: (props) => <Hheader {...props} name='Ibrahim' /> }} 
      />
      <Tab.Screen 
        name='home2' 
        component={Home2} 
        options={{ title: 'My Masjid' }} 
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated,loading } = useAuth();

  const navigation = useNavigation();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigation.navigate('nav');
  //   } else {
  //     navigation.navigate('login');
  //   }
  // }, [isAuthenticated, navigation]);


  return (
    <Stack.Navigator initialRouteName='signup'>
      <Stack.Screen name='login' component={Loginscreen} options={{ headerShown: false, }} />
      <Stack.Screen name = 'signup' component={SignupScreen} options = {{headerShown: false,}} />
      <Stack.Screen name = 'signupextras' component={SignupExtras} options = {{headerShown: false, /*presentation: 'card', gestureEnabled: true false*/}} />
      <Stack.Screen 
        name='details' 
        component={Details} 
        options={{ 
          title: 'Settings', 
          headerShown: true, 
          headerTintColor: 'green' 
        }} 
      />
      <Stack.Screen name='nav' component={MainNav} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
