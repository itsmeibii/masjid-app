import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  PanResponder,
} from 'react-native';
import { useModal } from '../context/AuthContext';
import TabBarLabel from './TabBarLabel';

const TabBar = ({ state, descriptors, navigation }) => {
  const selectedColor = '#184E77';
  const unselectedColor = 'rgba(0,0,0,0.4)';
  const { location: loc } = useModal();

  const animation = useRef(new Animated.Value(25)).current; // Start at bottom: 25
  const [isVisible, setIsVisible] = useState(true);

  // PanResponder for swipe gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          // User swipes down
          animation.setValue(25 + gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          // If user swiped down significantly, hide the tab bar
          setIsVisible(false); // Make the button appear instantly
          Animated.timing(animation, {
            toValue: -100,
            duration: 200, // Fast and direct animation
            useNativeDriver: false,
          }).start();
        } else {
          // Otherwise, reset to the original position
          Animated.timing(animation, {
            toValue: 25,
            duration: 200, // Fast and direct animation
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const showTabBar = () => {
    setIsVisible(true); // Make the tab bar visible instantly
    Animated.timing(animation, {
      toValue: 25,
      duration: 200, // Fast and direct animation
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      {/* Tab Bar with PanResponder */}
      <Animated.View
        {...panResponder.panHandlers} // Attach PanResponder
        style={[
          styles.tabBar,
          {
            bottom: animation, // Bind animation value to bottom position
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (route.name === 'Qibla' && !loc) {
              return Alert.alert(
                'Location not found',
                'Please enable location services to use this feature'
              );
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarLabel
              key={route.name}
              style={styles.tabBarItem}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              label={label}
              color={isFocused ? selectedColor : unselectedColor}
            />
          );
        })}
      </Animated.View>

      {/* Toggle Button */}
      {!isVisible && (
        <TouchableOpacity style={styles.toggleButton} onPress={showTabBar}>
          <Text style={styles.toggleButtonText}>⬆</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  toggleButton: {
    position: 'absolute',
    right: 30,
    bottom: 10,
    backgroundColor: '#184E77',
    borderRadius: 50,
    padding: 10,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default TabBar;
