import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Platform, SafeAreaView, StyleSheet, View, Text,TouchableOpacity, Image, Alert, Pressable, Modal} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MosqueInfo from './MosqueInfo';
import HijriJS from '../assets/Hijri';
import MosqueCard from '../components/MosqueCard';
import PrayerList from '../components/PrayerList';
import { useModal } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import Qibla from './Qibla';






export default function Home({navigation})
{
    const {events, name, setName, location, modal, setModal, mosqueData, isAppReady, startApp, nextPrayer, setNextPrayer, getAllCollections} = useModal()

    
    const [date] = useState(HijriJS.today().toString())
    const [selected,setSelected] = useState(false)
    const [mosqueModal, setMosqueModal] = useState(false);
    const [selectedMosque, setSelectedMosque] = useState(null);
    const [qiblaModal, setQiblaModal] = useState(false);
    
    
    useEffect(() => {
      if (mosqueData && mosqueData.length > 0) {
        setSelectedMosque(mosqueData[0]); // Set the initial mosque when data is available
      }
    }, [mosqueData]);

    
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
    
    
   

   
   const styles = StyleSheet.create({
    safe: {
        flex: 1,
        alignItems: 'center',
        
    },
    prayers : {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 10,
    },
    
    container : {
        
        flex: 0.4,
        width: '90%',
        backgroundColor: 'grey',
        borderRadius: '10',
        marginTop: 40,
        
        
        ...Platform.select({
            android: {
                elevation: 5,
            },
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            default : {}
        }),
        
    },
    text : {
        fontSize: 24,
        color: 'black',
    }
   })
    


  






  


// {location == undefined ? (
//   <ActivityIndicator size = 'small' color = 'green' />
//   ) : (
//   <MasjidDropdown  data = {mosqueData} loc = {location}/>
//   )
//   }
if (!mosqueData ||  !nextPrayer) {
    return <ActivityIndicator size="large" color="green" />;
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
    <SafeAreaView style = {{flex: 1, backgroundColor: 'white', alignItems: 'center',}}>
             <StatusBar style="dark" />
        
        
              {/* <Modal visible = {modal} onRequestClose = {() => setModal(false)} animationType = "slide" presentationStyle="fullScreen" >
                  
                      <Intro ></Intro>
                  
              </Modal> */}
               <Modal visible = {mosqueModal} onRequestClose = {() => setMosqueModal(false)} animationType = "slide" presentationStyle="pageSheet" >
                 <MosqueInfo mosque = {selectedMosque} close = {() => setMosqueModal(false)} />
                 </Modal>
                 <Modal visible = {qiblaModal} onRequestClose={() => setQiblaModal(false)} animationType='slide' presentationStyle='pageSheet' onDismiss = {() => setQiblaModal(false)} >
                   <Qibla loc = {location} close = {() => setQiblaModal(false)} visible = {qiblaModal}/>
                 </Modal>
      <View style = {{height: 48, width: 353,  flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
        <View style = {{width: 266, height: 48, alignItems: 'flex-start',  justifyContent: 'space-between'}}>
          <View style = {{flexDirection: 'row', alignItems: 'center'}}>
          <Text style = {{fontFamily: 'RobotoFlexEL',  fontSize: 15, fontWeight: 800}}> Hi, </Text>
          <Pressable onPress = {async () => {
          Alert.prompt('Enter your name', 'Please enter your name',async(name) => {await AsyncStorage.setItem('name', name); setName(name); })
          }}>
          <Text style = {{fontWeight: 800, fontSize: 16}}>{name || 'Guest'}!</Text>
          </Pressable>
          </View>
          <Text style = {{fontFamily: 'RobotoFlexSB', fontSize: 24, }}>Assalamualaykum!</Text>
        </View>
        <View style = {{height: 40,  alignItems: 'flex-end' , }}>
          <Text style = {{fontFamily: 'RobotoFlexEL',fontSize: 14,  color: 'rgba(51,51,51,0.8)', marginBottom: 5,}}>{convertHijriDate(date)}</Text>
          <Text style = {{fontSize: 14, fontFamily: 'RobotoFlexEL', color: 'rgba(51,51,51,0.8)'}}>{formatDate(new Date())}</Text>
        </View>
         
      </View>
      <MosqueCard  mosqueData = {mosqueData[0]} onPress = {() => setMosqueModal(true)}/>
      <PrayerList data = {mosqueData} onRowPress = {(index) => {
        
          setSelectedMosque(mosqueData[index]);
          setMosqueModal(true);
        }}/>
      <TouchableOpacity onPress = {() => setQiblaModal(true)}>
        <View style = {{position: 'absolute', height: 70, width: 70, borderRadius: '50%', backgroundColor: '#D9ED92', justifyContent: 'center', alignItems: 'center', bottom: 10, left: 110,
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
            <Image source  = {require('../assets/kaabah.png')} style = {{height: 45, width: 45,}} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}