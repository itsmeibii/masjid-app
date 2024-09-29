import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';


import { useModal } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const compassSize = width * 0.8;  // Size of the compass (80% of screen width)

export default function Compass({location, visible}) {
  
  const [errorMsg, setErrorMsg] = useState(null);
  const heading = useSharedValue(0);
  const qiblaHeading = useRef(0);
  const accumulatedHeading = useRef(0);
  const [kaabahRotation, setKaabahRotation] = useState(0);
  

  useEffect(() => {
    const initializeCompass = async () => {
      
      if (location) {
        const { latitude, longitude } = location;
        qiblaHeading.current = calculateQibla(latitude, longitude);
      }

      let subscription;
      try {
        subscription = await Location.watchHeadingAsync((headingData) => {
          if (headingData && typeof headingData.trueHeading === 'number') {
            const currentHeading = headingData.trueHeading;
            const previous = accumulatedHeading.current % 360;

            // Calculate the delta
            let delta = currentHeading - previous;

            // Allow heading to accumulate beyond 360 or below 0
            if (delta > 180) {
              delta -= 360;
            } else if (delta < -180) {
              delta += 360;
            }

            // Accumulate the heading value
            accumulatedHeading.current += delta;
            
            // Update the heading value
            heading.value = withTiming(accumulatedHeading.current, {
              duration: 500,
              easing: Easing.linear,
            });
            setKaabahRotation(accumulatedHeading.current);
            
          } else {
            console.error('Invalid heading data:', headingData);
          }
        });
      } catch (error) {
        console.error('Error starting heading watch:', error);
        setErrorMsg('Failed to start heading watch');
      }

      return () => {
        if (subscription && typeof subscription.remove === 'function') {
          subscription.remove();
        }
      };
    };

    initializeCompass();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${-heading.value}deg` }],  // Rotate the entire compass background
    };
  });

  // Calculate the Kaabah's position based on the Qibla heading
  const qiblaAngle = qiblaHeading.current;
  const angleInRadians = qiblaAngle * (Math.PI / 180);
  const kaabahX = compassSize / 2 + (compassSize / 2 - 25) * Math.sin(angleInRadians) - 25;
  const kaabahY = compassSize / 2 - (compassSize / 2 - 25) * Math.cos(angleInRadians) - 25;

  return (
    <View style={styles.container}>
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
      <MaterialIcons name = 'keyboard-double-arrow-up' size = {30} color = 'black' />
      <Animated.View style={[animatedStyle, { width: compassSize, height: compassSize }]}>
        <Image style={styles.compass} source={require('../assets/QCompass.png')} />
        <Image
          source={require('../assets/kaabah.png')}
          style={[styles.kaabah, { left: kaabahX, top: kaabahY }, {transform: [{ rotate: `${kaabahRotation}deg` }]}]}
        />
      </Animated.View>
      
    </View>
  );
}

// Function to calculate Qibla direction
const calculateQibla = (lat, lon) => {
  const kaabahLat = 21.4225;  // Latitude of the Kaabah in Mecca
  const kaabahLon = 39.8262;  // Longitude of the Kaabah in Mecca

  const dLon = (kaabahLon - lon) * (Math.PI / 180);

  const lat1 = lat * (Math.PI / 180);
  const lat2 = kaabahLat * (Math.PI / 180);

  const x = Math.sin(dLon) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon));

  let qiblaHeading = Math.atan2(x, y) * (180 / Math.PI);
  qiblaHeading = (qiblaHeading + 360) % 360;  // Normalize to 0-360 degrees

  return qiblaHeading;
};

// Function to get the current location
const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return null;
  }

  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  console.log(`Current location: ${latitude}, ${longitude}`);
  return { latitude, longitude };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  compass: {
    width: compassSize,
    height: compassSize,
  },
  kaabah: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
});
