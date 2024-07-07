import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const DefaultIcon = (props) => (
    <AntDesign name="right" color="black" {...props} />
  );
const UserInput = forwardRef(({ uinfo = false,show = true,icon: IconComponent = DefaultIcon, ...props }, ref) => {
  const styles = StyleSheet.create({
    container: {
      height: 70,
      width: '90%',
      backgroundColor: '#DFDFDF',
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    input: {
      fontSize: 20,
      flex: 1,
      marginLeft: 10,
      fontWeight: 'bold',
      
    },
  });

  return (
    <View style={styles.container}>
      <IconComponent size={30} style = {{marginHorizontal: 15}} color = '#373737' />
      <TextInput secureTextEntry = {!show}
      autoCapitalize = {uinfo}
      autoCorrect = {uinfo}
        ref={ref} 
        style={styles.input}
        placeholderTextColor="#8F8F8F"
        {...props}
      />
    </View>
  );
});

export default UserInput;
