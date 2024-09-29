import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sorter } from '../components/sorter'; // Assuming you have a sorter function in your components
import getNextPrayer from '../components/getNextPrayer';
import util from 'util';
import { getDistanceFromLatLonInMi } from '../components/sorter';


SplashScreen.preventAutoHideAsync();
// Create the Context
const ModalContext = createContext();




// Create a custom hook to use the ModalContext
export const useModal = () => {
  return useContext(ModalContext);
};


// Create a Provider component
export const ModalProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modal, setModal,] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState(undefined);
  const [mosqueData, setMosqueData] = useState(null); // Initialize to null
  const [isAppReady, setIsAppReady] = useState(false); // Track if the app is ready
  const [nextPrayer, setNextPrayer] = useState(null);
  const [events,setEvents]  = useState(null);
  const ref = useRef(false);


  async function getMosques() {
    try {
      
      
      const data = await fetch('https://express-linux-bkrf4j3bwa-ue.a.run.app/prayertimes');
      const snapshot = await data.json();
      
      return snapshot.collectionData;
    } catch (error) {
      console.error('Error fetching mosques:', error);
      throw error;
    }
  }
  async function getTimes(loc,mdata) {
    
    let copy = mdata;
    if (loc) {
      const {latitude, longitude} = loc;
      const params = new URLSearchParams({
        lat: latitude,
        lng: longitude
      })
      const data = await fetch (`https://express-linux-bkrf4j3bwa-ue.a.run.app/drivetime?${params.toString()}`);
      const response = await data.json();
      
      for (let mosque in response) {
        copy[mosque] = {...mdata[mosque], ...response[mosque]};
      }
      return copy;
    }
    return null;
  }



  async function loadName() {
    try {
      let temp = await AsyncStorage.getItem('fname');
      if (temp) {
        setName(temp);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async function initialize() {
    try {
      const found = await loadName();
      setModal(!found);
    } catch (e) {
      console.error('Error in loadName:', e);
      setModal(true);
    }
  }

  async function getSortedMosques(loc) {
    try {
      const mosques = await getMosques();
      const copy = await getTimes(loc, mosques);
      if (copy) {
        
        
        
        const sorted = mosques.sort((a,b) => a.distance.split(' ')[0] - b.distance.split(' ')[0]);
    
    return sorted;
      } else {
        return mosques;
      }
    
    } catch (e) {
      throw new Error(e);
    }
    
    

  }
 

  const checkPermissions = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === 'granted') {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      
    } else {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      if (newStatus === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        ('Location:', coords);
      } else {
        setLocation(null);
      }
    }
  };

  const startApp = async () => {
    try {
      await checkPermissions();
      await initialize();
      await getAllCollections();
      // const sortedMosques = await getSortedMosques(location);
      // setMosqueData(sortedMosques);
      setIsAppReady(true); // Mark the app as ready
    } catch (e) {
      console.error(e);
    }
  };
  let times = 0;
  async function getAllCollections() {
    
    //
    const response = await fetch ('https://express-linux-bkrf4j3bwa-ue.a.run.app/allevents');
    console.log();
    
    const data = await response.json();
    console.log('Data:', data);
    
    for (let key in data) {
      data[key].shift();
    }
    
    setEvents(data);
}
  useEffect(() => {
    
    getSortedMosques(location).then(async (sortedMosques) => {
      const obj = sortedMosques
      // const copy = await getAllCollections(obj);
      
      setMosqueData(obj);
      
    })
  }, [location]);

  // useEffect to update nextPrayer once mosqueData is set
  
  useEffect(() => {
   
    if (mosqueData) {
      
      
      setNextPrayer(getNextPrayer(mosqueData[0]));
      
      
      
    }
  
  
}, [mosqueData]);
useEffect(() => {
  startApp().then(() => {
    SplashScreen.hideAsync();
    
    
    
  })
  
}, [currentDate]);
useEffect(() => {
  const checkDateChange = () => {
    const newDate = new Date();
    if (newDate.getDate() !== currentDate.getDate()) {
      setCurrentDate(newDate); // Update the date to trigger the main useEffect
    }
  };

  const intervalId = setInterval(checkDateChange, 60000); // Check every minute

  return () => clearInterval(intervalId); // Clean up the interval on unmount
}, [currentDate]);

  return (
    <ModalContext.Provider value={{events, getAllCollections, modal, setModal, name, setName, location, mosqueData, isAppReady, startApp, nextPrayer, setNextPrayer, getNextPrayer }}>
      {children}
    </ModalContext.Provider>
  );
};
