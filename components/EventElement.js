import { StyleSheet, Text, TouchableOpacity, View, Linking, Image, ActivityIndicator, Alert, Platform, Dimensions, Touchable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Portal, Dialog, Button } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import Exclamation from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';


const EventElement = ({ data, isfirst }) => {
  let eventName, location, time, date, extraInfo;
  const screenWidth = Dimensions.get('window').width;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const abrs = {GIC: 'Gwinnett Islamic Center', HIC: 'Hamzah Islamic Center', RCM: 'Roswell Community Masjid', ICNF: 'Islamic Center of North Fulton'};
  const [reasons] = useState([
    {key: '1', value: 'False Content'},
    {key: '2', value: 'Wrong Location'},
    {key: '3', value: 'Wrong Time'},
    {key: '4', value: 'Event Cancelled/Postponed'},
    {key: '5', value: 'Other'},
  ])
  
  const formatLoc = (loc) => {
    if (!loc.includes(',')) {
      return loc;
    } else {
      return loc.split(',')[0];
    }
  };
  function truncateString(str) {
    if (str.length > 40) {
      return str.slice(0, 50 - 3).trim() + '...';
    }
    return str;
  }
  function capitalize(str) {
    return str
        .toLowerCase() // Convert entire string to lowercase
        .split(' ') // Split string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' '); // Join the words back into a string
}
  if (data?.id !== '0' && data?.data?.eventName) {
    ({ location, time, date, eventName, extraInfo } = data.data ?? {});
  }
  

  function formatDate(dateString) {
    
    const date = new Date(dateString.trim());
    if (!date) {
      return 'No Date Specified';
    }

    function getDaySuffix(day) {
      if (day > 3 && day < 21) return 'th'; // Covers 11th-19th
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    const dayOfMonth = date.getDate();
    const daySuffix = getDaySuffix(dayOfMonth);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[date.getMonth()];

    const year = date.getFullYear();
    if (!dayOfWeek || !dayOfMonth || !monthName || !year) {
      return dateString;
    }
    return `${dayOfWeek} ${dayOfMonth}${daySuffix} ${monthName}, ${year}`;
  }

  const handleReport = async (email) => {
    if (!selected) {
      Alert.alert('Error', 'Please select a reason');
      return;
    }
    try {
      
    
    const response = await fetch ('https://express-linux-970266916925.us-east1.run.app/submitreport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        masjid: data.mosque,
        id: data.id,
        reportType: selected,
        userEmail: email,
      }),

    })
  
    if (response.status == 400) {
      Alert.alert('Error', 'Cannot submit duplicate report');
    } else if (response.status == 200) {
      Alert.alert('Success', 'Report submitted successfully');
    } else {
      Alert.alert('Error', 'Something went wrong while submitting the report');
    }
  } catch (e) {
    Alert.alert('Error', e);
  }
  };

  const styles = StyleSheet.create({
    container: {
      height: 70,
      width: '100%',
      borderRadius: 15,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      marginVertical: 2,
      overflow: 'hidden'
    },
    dialogText: {
      fontSize: 15,
      marginVertical: 15,
    },
    actionsContainer: {
        flex: 1,
      
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
  });
  if (!eventName) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => setVisible(true)} style = {{alignItems: 'center'}}>
      <Portal style = {{alignItems: 'center'}}>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: 'white',  width: 353,  borderRadius: 16, alignItems: 'center', alignSelf: 'center' }}
          >
            
          
            <Dialog.Title style = {{fontSize: 23, color: 'rgb(51,51,51)', textAlign: 'center', fontWeight: 700}}>{capitalize(eventName)}</Dialog.Title>
            
              <View style = {{height: 296, width: 321, marginTop: 16, justifyContent: 'space-between'}}>
                  <View style = {{height: 88, width: '100%', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)'}}>
                    <Entypo name = 'location' size = {36} color = 'black' style = {{margin: 10,}} />
                    <View style = {{width: 250, height: 36, flexDirection: 'row'}}>
                      <Text style = {{fontWeight: 600, fontSize: 17, fontFamily: 'RobotoFlexSB'}}>Location:<Text style = {{fontSize: 12,  marginLeft: 30, color: 'rgba(51,51,51,0.64)'}}> {location}</Text></Text>
                      
                    </View>
                  </View>
                  <View style = {{height: 88, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                    <View style = {{width: 156, height: '100%', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)', justifyContent: 'center', alignItems: 'center', }}>
                      <View style = {{width: 132, height: 20, flexDirection: 'row', marginTop: 7,}}>
                      <Feather name = 'calendar'  size = {20}/>
                      <Text style = {{fontSize: 17, fontWeight: 600, marginLeft: 10, fontFamily: 'RobotoFlexSB', marginLeft: 10, }}>Date</Text>
                      </View>
                      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style = {{fontSize: 14, fontWeight: 300, marginTop: 10, textAlign: 'center', color: 'rgba(51,51,51,0.64)', marginBottom: 3,}}> {formatDate(date).trim()}</Text>
                      </View>
                    </View> 
                    <View style = {{width: 156, height: '100%', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style = {{width: 132, height: 20, flexDirection: 'row', marginTop: 7,}}>
                      <AntDesign name = 'clockcircleo'  size = {20}/>
                      <Text style = {{fontSize: 17, fontWeight: 600, marginLeft: 10, fontFamily: 'RobotoFlexSB', marginLeft: 10, }}>Time</Text>
                      </View>
                      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style = {{fontSize: 16, fontWeight: 600, marginTop: 10, textAlign: 'center', color: 'rgba(51,51,51,0.64)', marginBottom: 3,}}> {time}</Text>
                      </View>
                    </View>
                    

                  </View>
                  <View style = {{height: 88, width: '100%', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)'}}>
                    <Feather name = 'info' size = {36} color = 'black' style = {{margin: 10,}} />
                    <View style = {{flex: 1, height: '80%', justifyContent: 'space-around', }}>
                      <Text style = {{fontWeight: 600, fontSize: 17}}>Extra Information</Text>
                      <Text style = {{fontSize: 14, fontWeight: 300,  textAlign: 'left', color: 'rgba(51,51,51,0.64)', marginBottom: 3,}}> {extraInfo.trim()}</Text>
                    </View>
                  </View>
              </View>
            
            <Dialog.Actions>
              <View style = {{flexDirection: 'row', justifyContent: 'center', width: '100%', height: 44, marginTop: 30,}}>
                <Button  style = {{width: 156, height: '100%', borderRadius: 100, marginRight: 9}} buttonColor = '#0D6CFC' mode = 'contained' onPress={() => setVisible(false)}>Close</Button>
                <Button style = {{width: 156, height: '100%', borderRadius: 100,}} buttonColor = '#FF5B47' mode = 'contained' 
                icon = {() => <AntDesign name = 'exclamationcircleo' size = {23} color = 'white'/>} onPress = {() =>  {
                  setVisible(false);
                  setReportVisible(true)
                  }}><Text style = {{fontWeight: 800,}}>Report</Text></Button>
              </View>
            </Dialog.Actions>

          
        </Dialog>
        <Dialog visible = {reportVisible}
        onDismiss={() => setReportVisible(false)}
        style={{ backgroundColor: 'white',  width: 353,  borderRadius: 16, alignItems: 'center', alignSelf: 'center' }}>
          {/* {loading ? ( 
            
            <ActivityIndicator size = "large" color = "purple" />
            
          ) : (
            <>
            <Dialog.Title>Report Event: {eventName}</Dialog.Title>
            
            <SelectList
            setSelected={(val) => setSelected(val)} 
            data={reasons} 
            save="value"
            placeholder='Select a reason'
            search = {false}
            searchicon = {() => <Exclamation name = 'exclamation' size = {20} color = 'black' />}
            />
            
            <Dialog.Actions>
                <Button onPress = {() => setReportVisible(false)}>Cancel</Button>
                <Button 
                
                labelStyle={{ color: 'white' }} 
                style={{ backgroundColor: 'red' }} 
                onPress = {async () => {
                  if (!selected) {
                    Alert.alert('Error', 'Please select a reason');
                    return;
                  }
                  setLoading(true);
                  await handleReport();
                  setLoading(false);
                  setReportVisible(false);
                }}>
                
                Report
              </Button>
            </Dialog.Actions>
            </>
          )} */}
          <Dialog.Title >
              <View style = {{alignItems: 'center', flexDirection: 'column'}}>
              <Text style = {{fontSize: 17, fontWeight: 700, color: '#e30b33'}}>Report Event:</Text>
              <Text style = {{fontSize: 19, }}> {capitalize(eventName)}</Text>
              </View>
            </Dialog.Title>
            <Dialog.Content>
          {loading ? ( 
            
            <ActivityIndicator size = "large" color = "purple" />
            
          ) : (
            <View style = {{justifyContent: 'space-between', alignItems: 'center',}}>
            <Text style = {styles.dialogText}>Please select a reason for reporting this event:</Text>
            <SelectList
            setSelected={(val) => setSelected(val)} 
            data={reasons} 
            save="value"
            placeholder='Select a reason'
            search = {false}
            searchicon = {() => <Exclamation name = 'exclamation' size = {20} color = 'black' />}
            boxStyles = {{width: '90%', height: 40, borderRadius: 100, backgroundColor: 'rgba(224,224,224,0.32)', borderWidth: 0,}}
            inputStyles = {{color: 'rgba(0,0,0,0.48)'}}
            />
            </View>
            
            

            
            
          )}
          </Dialog.Content>
          <Dialog.Actions>
              <View style = {{flexDirection: 'row', justifyContent: 'center', width: '100%', height: 44, marginTop: 5,}}>
                <Button  style = {{width: 156, height: '100%', borderRadius: 100, marginRight: 9}} buttonColor = '#0D6CFC' mode = 'contained' onPress={() => setReportVisible(false)}>Cancel</Button>
                <Button style = {{width: 156, height: '100%', borderRadius: 100,}} buttonColor = '#FF5B47' mode = 'contained' 
                icon = {() => <AntDesign name = 'exclamationcircleo' size = {23} color = 'white'/>} onPress = {async () =>  {
                  let stored = await AsyncStorage.getItem('email');
                  if (!stored) {
                  Alert.prompt('Please enter your email to submit with the report', 'This info will not be shared', async (email) => {
                    if (!email) {
                      Alert.alert('Error', 'Please enter an email to submit the report');
                      return;
                    }
                    await AsyncStorage.setItem('email', email);
                    await handleReport(email);
                  
                  });
                } else {
                  await handleReport(stored);
                }
                  
                  setVisible(false);
                  setReportVisible(true)
                  }}><Text style = {{fontWeight: 800,}}>Report</Text></Button>
              </View>
            </Dialog.Actions>
            


        </Dialog>
      </Portal>
      {isfirst && (
        <View style = {{width: 353, height: 1, borderTopWidth: 1, borderTopColor:'rgba(0,0,0,0.2)', marginVertical: 15,}} />
      )}
          <View style = {{width: 353,  height: 120, overflow: 'auto',    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, marginVertical: 4, 
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.12,
                shadowRadius: 5,
              },
              android: {
                elevation: 5,
              },
            })}}>
              <View style = {{height: 80, width: 100, backgroundColor: '#FBFBFB', alignItems: 'center', justifyContent: 'center', borderRadius: 12, marginLeft: 8}}>
              <Entypo name = 'location' size = {16} />
             <Text style = {{fontSize: 11, textAlign: 'center',  marginTop: 4,}}>{formatLoc(location)}</Text>
              </View>
              <View style = {{flex: 0.7, height: '80%', marginLeft: 16, justifyContent: 'space-between', }}>
                <View style = {{flex: 1, justifyContent: 'space-around'}}>
                  <Text style = {{fontSize: 16, fontWeight: 700, color: data.color}}>{truncateString(capitalize(eventName))}</Text>
                  <Text style = {{fontFamily: 'RobotoFlexBOLD', fontSize: 12, lineHeight: 14, color: 'rgba(0,0,0,0.8)'}}>{formatDate(date)}</Text>
                  <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 11, lineHeight: 13, color: 'rgba(0,0,0,0.8)'}}>{time.trim()}</Text>
                </View>
              </View>
              <View style = {{flex: 0.3, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                
                  <View style = {{height: 35, width: 35, borderRadius: 22, backgroundColor: data.color, justifyContent: 'center', alignItems: 'center'}}>
                  <AntDesign name = 'arrowright' size = {22} color = 'black' /> 
                  </View>
                
              </View>

            </View>
          
      
    </TouchableOpacity>
  );
};

export default EventElement;
{/* <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: 'yellow',  }}>
          <View
            style={{
              height: 8,
              width: 8,
              borderRadius: 8,
              backgroundColor: data.color,
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{formatLoc(location)}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{eventName}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{date.split('-').slice(1).join('-')}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{time}</Text>
        </View>
      </View> */}
