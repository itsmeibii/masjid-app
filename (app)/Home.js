import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Platform, SafeAreaView, View, Text,TouchableOpacity, Image, Alert, Pressable, Modal, TextInput, ToastAndroid, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MosqueInfo from './MosqueInfo';
import HijriJS from '../assets/Hijri';
import MosqueCard from '../components/MosqueCard';
import PrayerList from '../components/PrayerList';
import { useModal } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import Qibla from './Qibla';
import { EvilIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import {Dialog, Portal, Button, Badge} from 'react-native-paper';

import { AirbnbRating } from '@rneui/base';
import KeyboardAvoidingDialog from '../components/KeyboardAvoidingDialog';
import AndroidDialog from 'react-native-dialog';
import * as Location from 'expo-location';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';









export default function Home()
{   
  let userLocation;
   const [feedback, setFeedback] = useState('');
    const {setLocation,  name, setName, location, mosqueData, nextPrayer, getAllCollections } = useModal()
    const [email, setEmail] = useState('')
    const [rating, setRating] = useState(3);
    const [loading, setLoading] = useState({feedbackLoading: false, qiblaLoading: false});
    const [date] = useState(HijriJS.today().toString())
    const [feedbackVisible, setFeedbackVisible] = useState(false)
    const [mosqueModal, setMosqueModal] = useState(false);
    const [selectedMosque, setSelectedMosque] = useState(null);
    const [qiblaModal, setQiblaModal] = useState(false);
    const [aDialog, setADialog] = useState({visible: false, name: '', loc: {visible: false, message: '', title: ''}});
    let bar = 'dark'
    
    useEffect(() => {
      if (mosqueData && mosqueData.length > 0) {
        setSelectedMosque(mosqueData[0]); // Set the initial mosque when data is available
      }
    }, [mosqueData]);
    

  useEffect(() => {
    
    getAllCollections();
    const showToast = () => {
      Toast.show({
        type: 'error',
        text1: 'Disclaimer',
        text2: 'This app is not optimized for tablets',
      })
    }
    let isTablet = DeviceInfo.isTablet();
    if (isTablet) {
      if (Platform.OS === 'android')
      ToastAndroid.show('Warning: This app is not optimized for tablets', ToastAndroid.LONG);
      else
      showToast();
    }
  },[])
  
    
    async function handleFeedback () {
      setLoading(prev => ({...prev, feedbackLoading: true}));
      if (rating == null || feedback == '') {
        Alert.alert('Error', 'Please rate your experience using Halaqah');
        setLoading(prev => ({...prev, feedbackLoading: false}));
      
        return;
      }
      
      
      
      
      try {
       
        
      let feedbackobj = {
        rating,
        email,
        message: feedback,
        
      };
      const response = await fetch('https://express-linux-970266916925.us-east1.run.app/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedbackobj,
        }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Feedback submitted successfully');
        
        
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting feedback');
      console.error('ERROR IN FEEDBACK' + error)
    } finally {
      setLoading(prev => ({...prev, feedbackLoading: false}));
      setFeedbackVisible(false);
      setRating(null);
    }
      
    }
    function convertHijriDate(hijriDateString) {
      // Hijri month names (short version) from HijriJS
      const hijriMonths = HijriJS.lang['en'].monthShortNames;
    
      // Remove the trailing 'H' and split the date string
      let [day, month, year] = hijriDateString.replace('H', '').split('/').map(Number);
    
      // Convert the month number to the corresponding Hijri month name
      const hijriMonthName = hijriMonths[month - 1]; // Adjusting for 0-based index
    
      // Return the formatted Hijri date string
      return `${day} ${hijriMonthName}, ${year}`;
    }
    function formatDate(date) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      
      // Insert a comma before the year
      return formattedDate.replace(/ (\d{4})$/, ', $1');
    }
    
    
    const handleOpenQiblaFinder = async () => {
      setLoading(prev => ({ ...prev, qiblaLoading: true }));
    
      try {
        // If location is already available, proceed to Qibla screen
        if (location) {
          userLocation = location;
          setLoading(prev => ({ ...prev, qiblaLoading: false }));
          setQiblaModal(true); // Open Qibla screen
          return;
        }
    
        // Check if location permissions are already granted
        const { status } = await Location.getForegroundPermissionsAsync();
        
        if (status === 'granted') {
          // Permissions already granted, fetch location
          const { coords } = await Location.getCurrentPositionAsync({});
          setLocation(coords); // Set location in state
          userLocation = coords;
          setLoading(prev => ({ ...prev, qiblaLoading: false }));
          setQiblaModal(true); // Open Qibla screen
        } else if (status === 'denied') {
          // If permission is denied, request permission
          const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
          
          if (newStatus === 'granted') {
            // Permission granted, fetch location
            const { coords } = await Location.getCurrentPositionAsync({});
            setLocation(coords); // Set location in state
            userLocation = coords;
            setLoading(prev => ({ ...prev, qiblaLoading: false }));
            setQiblaModal(true); // Open Qibla screen
          } else {
            // Permission denied, show an alert
            setLoading(prev => ({ ...prev, qiblaLoading: false }));
            Platform.OS === 'android' 
              ? setADialog(prev => ({
                  ...prev,
                  loc: {
                    visible: true,
                    title: 'Location Required to Display Qibla',
                    message: 'Don’t worry, your location is not collected.',
                  },
                }))
              : Alert.alert(
                  'Location Required',
                  'The compass cannot be opened because we cannot access your location. Don’t worry, your location data is not collected.'
                );
          }
        }
      } catch (error) {
        setLoading(prev => ({ ...prev, qiblaLoading: false }));
        console.error('Error fetching location:', error);
        Platform.OS === 'android'
          ? setADialog(prev => ({
              ...prev,
              loc: { visible: true, title: 'Error Fetching Location', message: 'Please try again.' },
            }))
          : Alert.alert('Error', 'There was an error accessing your location. Please try again.');
      }
    };
    

   
 
    


  






  


// {location == undefined ? (
//   <ActivityIndicator size = 'small' color = 'green' />
//   ) : (
//   <MasjidDropdown  data = {mosqueData} loc = {location}/>
//   )
//   }
if (!mosqueData ||  !nextPrayer) {
return (
  <SafeAreaView style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
     <ActivityIndicator size="large" color="green" />
    </SafeAreaView>
    )
  }
 
  //  return (

  //   <SafeAreaView style = {[styles.safe, {marginVertical: 0,}]} >

  //       <StatusBar style="dark" />
        
        
  //       <Modal visible = {modal} onRequestClose = {() => setModal(false)} animationType = "slide" presentationStyle="pageSheet" >
            
  //               <Intro ></Intro>
            
  //       </Modal>
  //       <Modal visible = {mosqueModal} onRequestClose = {() => setMosqueModal(false)} animationType = "slide" presentationStyle="pageSheet" >
  //         <MosqueInfo mosque = {selectedMosque} close = {() => setMosqueModal(false)} />
  //         </Modal>
  //         <Modal visible = {qiblaModal} onRequestClose={() => setQiblaModal(false)} animationType='slide' presentationStyle='pageSheet' >
  //           <Qibla loc = {location} close = {() => setQiblaModal(false)}/>
  //         </Modal>
        
  //       <TouchableOpacity style = {[styles.container, {overflow: 'hidden'}]} onPress = {() => setMosqueModal(true)} > 
  //       <ImageBackground source = {{uri: mosqueData[0].imageURL}} style = {{width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 15,}} >
        
  //       <Text style = {{fontSize: 25, fontWeight: '600', color: 'white', marginLeft: 15, marginTop: 30,}}>{mosqueData[0].Masjid}</Text>
  //       { nextPrayer ? (
  //         <>
  //         <Text style = {styles.prayers}>Next Prayer: {nextPrayer.Prayer}</Text>
  //         <Text style = {styles.prayers}>Time: {nextPrayer.Time}</Text>
  //         </>
  //       ) : (
  //         <ActivityIndicator size="large" color="green" />
  //       )}
        

        
  //       </ImageBackground>
  //       </TouchableOpacity>
  //       {mosqueData ? (
  //         <View style = {{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', }} >
  //         <PrayerTable data = {mosqueData} nextPrayer = {nextPrayer} onRowPress = {(index) => {
  //         setSelectedMosque(mosqueData[index]);
  //         setMosqueModal(true);
  //       }} />
  //       </View>
  //       ): <TableSkeleton />}
        
  //       <View style = {{top: 180,left: 120,}}>
  //       <IconButton size = {50}icon = {() => <Kaabah name = 'kaaba' size = {25} color = 'black' />} onPress = {() => setQiblaModal(true)} mode = 'contained' backgroundColor='#b359b0' />
  //       </View>
  //   </SafeAreaView>

  //  );
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: 'white', alignItems: 'center', marginTop: Platform.OS !== 'ios' ? 15 : null}}>
             <StatusBar style={bar} />
             <Portal style = {{alignItems: 'center'}}>
             
             
        <KeyboardAvoidingDialog
          visible={feedbackVisible}
          onDismiss={() => setFeedbackVisible(false)}
          style={{ backgroundColor: 'white',  width: 353,  borderRadius: 16, alignItems: 'center', alignSelf: 'center' }}
          >
            
          <Dialog.Title style = {{ margin: 0,}} >
              <View style = {{alignItems: 'center', flexDirection: 'column'}}>
              <Text style = {{fontSize: 17, fontWeight: 700, textAlign: 'center'}}>How is your experience using Halaqah?</Text>
              <Text style = {{fontSize: 13, textAlign: 'center', marginVertical: 5,}}>For inquiries regarding adding features or masjids, please contact <Text style = {{fontWeight: 'bold'}}>(470) 861-9203</Text></Text>
              </View>
            </Dialog.Title>
            <Dialog.Content style = {{width: '100%', margin: 0,}}>
              {loading.feedbackLoading ? <ActivityIndicator size = 'large' color = 'green' /> : (
                <View style = {{justifyContent: 'space-between', alignItems: 'center',  width: '100%'}}>
                <AirbnbRating onFinishRating = {(number) => setRating(number) } defaultRating={3} ratingContainerStyle = {{ marginBottom: 30,}}/>
                  <View style = {{width: '90%',flexDirection: 'row',backgroundColor: 'rgba(224,224,224,0.32)', height: 40, borderRadius: 50,  alignItems: 'center', marginTop: 10,}}>
                <TextInput value = {email} onChangeText = {(text) => setEmail(text)} placeholder = 'Enter your email (Optional)' style = {{  borderWidth: 0,   marginLeft: 20, width: '90%', }}  placeholderTextColor='rgba(37,37,37,0.9)' autoCapitalize={false}/>
                 
                  </View>
  
                  <View style = {{backgroundColor: 'yellow', width: '90%',  textAlign: 'center', backgroundColor: 'rgba(224,224,224,0.32)', borderRadius: 50, marginTop: 15, justifyContent: 'center', }}>
                  <TextInput  placeholder = 'Description' style = {{ marginLeft: 20,width: '90%', height: 40, textAlignVertical: 'top'}} value = {feedback} onChangeText = {(text) => setFeedback(text)} placeholderTextColor='rgba(37,37,37,0.9)'/>
                  </View>
              {/* <Text style = {styles.dialogText}>Please select a reason for reporting this event:</Text>
              <SelectList
              setSelected={(val) => setSelected(val)} 
              data={reasons} 
              save="value"
              placeholder='Select a reason'
              search = {false}
              searchicon = {() => <Exclamation name = 'exclamation' size = {20} color = 'black' />}
              boxStyles = {{width: '90%', height: 40, borderRadius: 100, backgroundColor: 'rgba(224,224,224,0.32)', borderWidth: 0,}}
              inputStyles = {{color: 'rgba(0,0,0,0.48)'}}
              /> */}
              </View>

              )}
          
            
            
            

            
            
          
          </Dialog.Content>
          {!loading.feedbackLoading && (
          <Dialog.Actions>
              <View style = {{flexDirection: 'row', justifyContent: 'center', width: '100%', height: 44, marginTop: 5,}}>
                <Button  style = {{width: 156, height: '100%', borderRadius: 100, marginRight: 9}} buttonColor = '#0D6CFC' mode = 'contained' onPress={() => setFeedbackVisible(false)} labelStyle = {{color: 'white'}}>Cancel</Button>
                <Button style = {{width: 156, height: '100%', borderRadius: 100,}} buttonColor = '#FF5B47' mode = 'contained' onPress = {async () => {
                  await handleFeedback();
                  
                }} 
                
                  ><Text style = {{fontWeight: 800, color: 'white'}}>Submit</Text></Button>
              </View>
            </Dialog.Actions>
          )}
            


        
          
            

          
        </KeyboardAvoidingDialog>
        
        </Portal>
        
        
              {/* <Modal visible = {modal} onRequestClose = {() => setModal(false)} animationType = "slide" presentationStyle="fullScreen" >
                  
                      <Intro ></Intro>
                  
              </Modal> */}
               <Modal visible = {mosqueModal} onRequestClose = {() => setMosqueModal(false)} animationType = "slide" presentationStyle="pageSheet" >
                 <MosqueInfo mosque = {selectedMosque} close = {() => setMosqueModal(false)} />
                 </Modal>
                 <Modal visible = {qiblaModal} close = {() => setQiblaModal(false)} animationType = "slide" presentationStyle="pageSheet">
                   <Qibla loc = {userLocation ?? location} close = {() => setQiblaModal(false)} visible = {qiblaModal}/>
                 </Modal>
                 {Platform.OS !== 'ios' ? (
                  <View>
                  <AndroidDialog.Container visible={aDialog.visible}>
                    <AndroidDialog.Title>Enter Your Name</AndroidDialog.Title>
                    <AndroidDialog.Description>
                      This info is only stored locally
                    </AndroidDialog.Description>
                    <AndroidDialog.Input
                      onChangeText={(text) => 
                        setADialog((prev) => ({
                          ...prev,
                          name: text,
                        })) // Capture the text into a simple variable
                      }
                      value = {aDialog.name}
                    />
                    <AndroidDialog.Button label="Cancel"  onPress = {() => setADialog((prev) => ({
                      ...prev,
                      visible: false,
                    }))}/>
                    <AndroidDialog.Button label="Change" onPress = { async () => {await AsyncStorage.setItem('name', aDialog.name); setName(aDialog.name); setADialog(prev => ({...prev, visible: false}))}} />
                  </AndroidDialog.Container>
                </View>
                 ) : null}
                 <AndroidDialog.Container visible = {aDialog.loc.visible}>
                    <AndroidDialog.Title>{aDialog.loc.title}</AndroidDialog.Title>
                    <AndroidDialog.Description>{aDialog.loc.message}</AndroidDialog.Description>
                    <AndroidDialog.Button label = 'OK' onPress = {() => setADialog(prev => ({...prev, loc: {message: '',  visible: false, title: ''}}))} />
                 </AndroidDialog.Container>
      <View style = {{height: 48, width: '95%',  flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'space-between', }}>

        <View style = {{ height: 48, alignItems: 'flex-start',  justifyContent: 'space-between',}}>
          <View style = {{flexDirection: 'row', alignItems: 'center'}}>
          <Text style = {{fontFamily: 'RobotoFlexEL',  fontSize: 15, fontWeight: 800}}> Hi, </Text>
          <Pressable onPress = {async () => {
            if (Platform.OS === 'ios') {
          Alert.prompt('Enter your name', 'This info is only stored locally',async(name) => {await AsyncStorage.setItem('name', name); setName(name); })
            } else {
              setADialog((prev) => ({
                ...prev,
                visible: true,
            } ));
            }

          }} style = {{flexDirection: 'row'}}>
          <Text style = {{fontWeight: 800, fontSize: 16}}>{name || 'Guest'}!</Text>
          {!name && (
          <Badge style = {{backgroundColor: '#ff2929', marginLeft: 5,}} size = {20} >
            <FontAwesome5 name = 'pencil-alt' size = {10} color = 'white'  />
             </Badge>
          )}
          </Pressable>
          </View>
          <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 24, }}>Assalamualaykum!</Text>
        </View>
        <View style = {{flexDirection: 'row', height: 60, alignItems: 'center'}}>
        <View style = {{height: 60,  alignItems: 'flex-end' , justifyContent: 'center', paddingRight: 10, borderRightWidth: 1, borderRightColor: 'rgba(0,0,0,0.2)' }}>
          <Text style = {{fontFamily: 'RobotoFlexEL',fontSize: 14,  color: 'rgba(51,51,51,0.8)', marginBottom: 5,}}>{convertHijriDate(date)}</Text>
          <Text style = {{fontSize: 14, fontFamily: 'RobotoFlexEL', color: 'rgba(51,51,51,0.8)'}}>{formatDate(new Date())}</Text>
        </View>
        <TouchableOpacity style = {{width: 35, marginLeft: 10,}} onPress = {() => setFeedbackVisible(true)}>
          <View  style = {{width: '100%', height: 40, borderRadius: 10, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9ED92'}}>
            {Platform.OS === 'ios' ? (
              <EvilIcons name = 'comment' size = {25} color = 'black'  />
            ) : (
              <FontAwesome name = 'comment-o' size = {18} color = 'black' style = {{marginBottom: 3,}} />
            )}
      
          
          </View>
          </TouchableOpacity>
          </View>
         
      </View>
      <MosqueCard  mosqueData = {mosqueData[0]} onPress = {() => setMosqueModal(true)}/>
      <PrayerList data = {mosqueData} style = {{width: '100%'}}onRowPress = {(index) => {
        
          setSelectedMosque(mosqueData[index]);
          setMosqueModal(true);
        }}/>
      <TouchableOpacity onPress = { async () =>  {
        await handleOpenQiblaFinder();
      }}>
        <View style = {{position: 'absolute', height: 70, width: 70, borderRadius: 35, backgroundColor: '#D9ED92', justifyContent: 'center', alignItems: 'center', bottom: 10, left: 110,
            ...Platform.select({
              android: {
                  elevation: 5,
              },
              ios: {
                  shadowColor: '#89d99e',
                  shadowOffset: { width: 0, height: 0},
                  shadowOpacity: 0.8,
                  shadowRadius: 9,
              },
             
            })
          }}>
        {loading.qiblaLoading ? (
            <ActivityIndicator size = 'small' color = 'white' />
        ): (
          
              <Image source  = {require('../assets/kaabah.png')} style = {{height: 45, width: 45,}} />
          
        )}
       </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}