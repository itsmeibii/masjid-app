import React, { forwardRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/Ionicons'
const DefaultIcon = (props) => (
    <AntDesign name="right" color="black" {...props} />
  );
  const ShowP = (props) => (
    <Eye name = 'eye' color = "black" {...props} />
  )
  const HideP = (props) => (
    <Eye name = 'eye-off-outline' color = 'black' {...props} />
  )
  //default height is 70
  //y=(x+10)/4
  //y is fontSize
  //x is height
  //y=0.35x+5.5
  //y is size
  //x is height
 
  
const UserInput = forwardRef(({ fontSize = null, uinfo = false,show = true,icon: IconComponent = DefaultIcon, height = 70, width = '90%', ...props }, ref) => {
  const heightToSize = height => 0.35 * height + 5.5;
  const heightToFontSize = height => (height+10)/4;
 
  const [hidden, setHidden] = useState(true);
  const styles = StyleSheet.create({
    container: {
      height, 
      width,
      backgroundColor: '#DFDFDF',
      borderRadius: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    input: {
      fontSize: fontSize || heightToFontSize(height),
      flex: (show ? 0.9 : 1),
      marginLeft: 10,
      fontWeight: 'bold',
      borderLeftColor: 'rgba(0,0,0,0.3)',
      borderLeftWidth: 1,
       
      
      paddingLeft: 15,
      height: '50%',
      ...(!show && {
        borderRightColor: 'rgba(0,0,0,0.3)',
        borderRightWidth: 1,
      }),
      
    },
    icon : {
      marginHorizontal: 15,
    }
  });

  return (
    <View style={styles.container}>
      <IconComponent size={heightToSize(height)} style = {styles.icon} color = '#373737' />
      <TextInput secureTextEntry = {!show ? hidden : !show}
      autoCapitalize = {uinfo}
      autoCorrect = {uinfo}
        ref={ref} 
        style={styles.input}
        placeholderTextColor="#8F8F8F"
        {...props}
      />
      {!show && (
        <TouchableOpacity style = {{flex: 0.3}} onPress={() => setHidden(!hidden)}>
          {hidden ? (
            <HideP size={30} style={styles.icon} color="#373737" />
          ) : (
            <ShowP size={30} style={styles.icon} color="#373737" />
          )}
        </TouchableOpacity>
      )}
      
      
    </View>
  );
});

export default UserInput;
