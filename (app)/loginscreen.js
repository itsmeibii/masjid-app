import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import UserInput from '../components/input';
import EmailIconImport from 'react-native-vector-icons/MaterialCommunityIcons';
import PassIconImport from 'react-native-vector-icons/Foundation';



SplashScreen.preventAutoHideAsync();

export default function Loginscreen({ navigation }) {
  const einputref = useRef();
  const pinputref = useRef();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);


  

  const getFonts = async () => {
    await Font.loadAsync({
      Roboto_Mono: require('../assets/fonts/Roboto Mono.ttf'),
    });
    setFontsLoaded(true);
  };

  const handleLogin = () => {
    if (!emailRef.current) {
      einputref.current.focus();
      Alert.alert('Please enter an email');
    } else if (!passwordRef.current) {
      pinputref.current.focus();
      Alert.alert('Please enter a password');
    } else if (
      emailRef.current.length < 4 ||
      (emailRef.current.slice(-4) !== '.com' || !emailRef.current.includes('@'))
    ) {
      einputref.current.focus();
      Alert.alert('Please enter a valid email address');
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Handle login process
  };

  useEffect(() => {
    getFonts().then(() => {
      SplashScreen.hideAsync();
    });
    emailRef.current = '';
    passwordRef.current = '';
    
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      width: '100%',
    },
    login_button: {
      height: 70,
      width: '90%',
      backgroundColor: '#2DE371',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    title: {
      flex: 0.2,
      alignItems: 'center',
      width: '100%',
      marginBottom: 0,
    },
    login_input: {
      flex: 0.5,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signup: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    forgot_password: {
      height: 30,
      width: '90%',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginBottom: 5,
    },
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner component
  }
//Implement KeyboardAvoidingView
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize: 50, paddingTop: 30, fontWeight: 'bold' }}>Login</Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Image source={require('../assets/loginpv.png')} style={{ height: 300, width: 300, marginBottom: 30 }} />
            <View style={styles.login_input}>
              <UserInput
                onChangeText={(text) => (emailRef.current = text)}
                placeholder="Email"
                ref={einputref}
                icon={(props) => {
                  return <EmailIconImport name="email-multiple" {...props} />;
                }}
              />
              <UserInput
                onChangeText={(text) => (passwordRef.current = text)}
                placeholder="Password"
                ref={pinputref}
                show={false}
                icon={(props) => {
                  return <PassIconImport name="key" {...props} />;
                }}
              />
              <View style={styles.forgot_password}>
                <Text style={{ fontWeight: 'bold', color: 'grey' }}>Forgot Password?</Text>
              </View>

              {loading ? (
                <ActivityIndicator size="small" color="#2DE371" />
              ) : (
                <TouchableOpacity
                  style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => handleLogin()}
                >
                  <View style={styles.login_button}>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: '900' }}> Login </Text>
                  </View>
                </TouchableOpacity>
              )}
              <View style={styles.signup}>
                <Text style={{ fontSize: 15 }}> New Here? </Text>
                <Pressable onPress={() => navigation.navigate('signup')}>
                  <Text style={{ fontWeight: 'bold', color: 'darkgreen', fontSize: 15 }}> Sign up! </Text>
                </Pressable>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      
    </SafeAreaView>
  );
}
