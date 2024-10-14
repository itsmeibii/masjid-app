// import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
// import * as Location from 'expo-location';
// import * as SplashScreen from 'expo-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { sorter } from '../components/sorter'; // Assuming you have a sorter function in your components
// import getNextPrayer from '../components/getNextPrayer';
// import util from 'util';
// import { getDistanceFromLatLonInMi } from '../components/sorter';
// import '../assets/firebase'
// import { firebase } from '@react-native-firebase/app';


// SplashScreen.preventAutoHideAsync();
// // Create the Context
// const ModalContext = createContext();




// // Create a custom hook to use the ModalContext
// export const useModal = () => {
//   return useContext(ModalContext);
// };


// // Create a Provider component
// export const ModalProvider = ({ children }) => {
//   const [token, setAppToken] = useState('');
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [modal, setModal,] = useState(false);
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState(undefined);
//   const [mosqueData, setMosqueData] = useState(null); // Initialize to null
//   const [isAppReady, setIsAppReady] = useState(false); // Track if the app is ready
//   const [nextPrayer, setNextPrayer] = useState(null);
//   const [events,setEvents]  = useState(null);
//   const ref = useRef(false);
//   async function getToken() {
    
//       const { token } = await firebase.appCheck().getToken(true);
    
//       if (token.length > 0) {
//         return token;
//       }
//       throw new Error('AppCheck verification failed');
    
      
//   }
//   // async function testFB() {
//   //   try {
//   //     const { token } = await firebase.appCheck().getToken(true);
    
//   //     if (token.length > 0) {
//   //       console.log('AppCheck verification passed');
//   //       console.log(JSON.stringify(token));
//   //     }
//   //   } catch (error) {
//   //     console.log('AppCheck verification failed');
//   //   }
//   // }
//   async function getMosques(token) {
//     try {
      
      
//       const data = await fetch('https://express-linux-970266916925.us-east1.run.app/prayertimes', {
//         headers: {
//           'x-firebase-appcheck': token
//         }
//       });
//       const snapshot = await data.json();
      
//       return snapshot.collectionData;
//     } catch (error) {
//       console.error('Error fetching mosques:', error);
//       throw error;
//     }
//   }
//   async function getTimes(loc,mdata,token) {
   
//     let copy = mdata;
//     if (loc) {
      
//       const {latitude, longitude} = loc;
//       const params = new URLSearchParams({
//         lat: latitude,
//         lng: longitude
//       })
      
//       const data = await fetch (`https://express-linux-970266916925.us-east1.run.app/drivetime?${params.toString()}`, {
//         headers: {
//           'x-firebase-appcheck': token
//         }
//       });
//       console.log(`DRIVTIME DATA ${!!data}`)
//       const response = await data.json();
      
//       for (let mosque in response) {
//         copy[mosque] = {...mdata[mosque], ...response[mosque]};
//       }
//       return copy;
//     }
//     return null;
//   }



//   async function loadName() {
//     try {
//       let temp = await AsyncStorage.getItem('fname');
//       if (temp) {
//         setName(temp);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (e) {
//       return false;
//     }
//   }

//   async function initialize() {
//     try {
//       const found = await loadName();
//       setModal(!found);
//     } catch (e) {
//       console.error('Error in loadName:', e);
//       setModal(true);
//     }
//   }

//   async function getSortedMosques(loc,token) {
//     try {
//       const mosques = await getMosques(token);
//       console.log('MAPS RAN')
//       const copy = await getTimes(loc, mosques,token);
//       if (copy) {
        
        
        
//         const sorted = mosques.sort((a,b) => a.distance.split(' ')[0] - b.distance.split(' ')[0]);
    
//     return sorted;
//       } else {
//         return mosques;
//       }
    
//     } catch (e) {
//       throw new Error(e);
//     }
    
    

//   }
 

//   const checkPermissions = async () => {
//     const { status } = await Location.getForegroundPermissionsAsync();
//     if (status === 'granted') {
//       const { coords } = await Location.getCurrentPositionAsync({});
//       setLocation(coords);
      
//     } else {
//       const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
//       if (newStatus === 'granted') {
//         const { coords } = await Location.getCurrentPositionAsync({});
//         setLocation(coords);
//         ('Location:', coords);
//       } else {
//         setLocation(null);
//       }
//     }
//   };

//   const startApp = async () => {
//     try {
//       let token = await getToken();
//       setAppToken(token);
//       await checkPermissions();
//       await initialize();
//       await getAllCollections(token);
//       let obj = await getSortedMosques(location,token)
//       setMosqueData(obj);
//       // const sortedMosques = await getSortedMosques(location);
//       // setMosqueData(sortedMosques);
//       setIsAppReady(true); // Mark the app as ready
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   let times = 0;
//   async function getAllCollections(token) {
    
//     //
//     try {
//     const response = await fetch ('https://express-linux-970266916925.us-east1.run.app/allevents', {
//       headers: {
//         'x-firebase-appcheck': `${token}`
//       }
//     });
//     if (response.status == 503) {
//       throw new Error('down');
//     }
    
//     const data = await response.json();
    
    
//     for (let key in data) {
//       data[key].shift();
//     }
    
//     setEvents(data);
//   } catch (e) {
//     throw new Error(e);
//   }
// }
//   useEffect(() => {
    
    
//   }, [location]);

//   // useEffect to update nextPrayer once mosqueData is set
  
//   useEffect(() => {
   
//     if (mosqueData) {
      
      
//       setNextPrayer(getNextPrayer(mosqueData[0]));
      
      
      
//     }
  
  
// }, [mosqueData]);
// useEffect(() => {
  
//   startApp().then(() => {
//     SplashScreen.hideAsync();
//     console.log('RAN')
    
    
    
//   })
  
  
// }, [currentDate]);
// useEffect(() => {
//   const checkDateChange = () => {
//     const newDate = new Date();
//     if (newDate.getDate() !== currentDate.getDate()) {
//       setCurrentDate(newDate); // Update the date to trigger the main useEffect
//     }
//   };

//   const intervalId = setInterval(checkDateChange, 60000); // Check every minute

//   return () => clearInterval(intervalId); // Clean up the interval on unmount
// }, [currentDate]);

//   return (
//     <ModalContext.Provider value={{token, events, getAllCollections, modal, setModal, name, setName, location, mosqueData, isAppReady, startApp, nextPrayer, setNextPrayer, getNextPrayer }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
 // Assuming you have a sorter function in your components
import getNextPrayer from '../components/getNextPrayer';

// import init from '../assets/firebase'
// import { firebase } from '@react-native-firebase/app';


SplashScreen.preventAutoHideAsync();

// Create the Context
const ModalContext = createContext();

// Create a custom hook to use the ModalContext
export const useModal = () => {
  return useContext(ModalContext);
};

// Create a Provider component
export const ModalProvider = ({ children }) => {
  // const [token, setAppToken] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState(undefined);
  const [mosqueData, setMosqueData] = useState(null); // Initialize to null
  const [isAppReady, setIsAppReady] = useState(false); // Track if the app is ready
  const [nextPrayer, setNextPrayer] = useState(null);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);
  


  
  // async function getToken() {
    
  //   const { token } = await firebase.appCheck().getToken(true);
  //   if (token.length > 0) {
  //     console.log(token);
  //     return token;
  //   }

    
  //   throw new Error('AppCheck verification failed');
  // }

  async function getMosques() {
    try {
      
      const data = await fetch('https://express-linux-970266916925.us-east1.run.app/prayertimes');
      
      const snapshot = await data.json();
      
      if (snapshot.status === 503) {
        throw new Error('down');
      }
      return snapshot.collectionData;
    } catch (error) {
      console.error('Error fetching mosques:', error);
      throw error;
    }
  }
  function durtomin(durationText) {
    let totalMinutes = 0;

    // Extracting days, hours, and minutes using regex patterns
    const dayMatch = durationText.match(/(\d+)\s*day/);
    const hourMatch = durationText.match(/(\d+)\s*hour/);
    const minuteMatch = durationText.match(/(\d+)\s*min/);

    if (dayMatch) {
        totalMinutes += parseInt(dayMatch[1], 10) * 24 * 60; // 1 day = 24 hours = 1440 minutes
    }
    if (hourMatch) {
        totalMinutes += parseInt(hourMatch[1], 10) * 60; // 1 hour = 60 minutes
    }
    if (minuteMatch) {
        totalMinutes += parseInt(minuteMatch[1], 10); // Already in minutes
    }

    return totalMinutes;
}
  async function getTimes(loc, mdata) {
    let copy = mdata;
    if (loc) {
      const { latitude, longitude } = loc;
      const params = new URLSearchParams({
        lat: latitude,
        lng: longitude
      });

      const data = await fetch(`https://express-linux-970266916925.us-east1.run.app/drivetime?${params.toString()}`);
      const response = await data.json();

      for (let mosque in response) {
        copy[mosque] = { ...mdata[mosque], ...response[mosque] };
      }
      return copy;
    }
    return null;
  }

  async function loadName() {
    try {
      let temp = await AsyncStorage.getItem('name');
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
        const sorted = mosques.sort((a, b) => durtomin(a.duration) - durtomin(b.duration));
        return sorted;
      } else {
        return mosques;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  const checkPermissions = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        
        return coords; // Return the coordinates directly for further processing
      } else {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        if (newStatus === 'granted') {
          const { coords } = await Location.getCurrentPositionAsync({});
          
          return coords; // Return the coordinates directly for further processing
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  };

  const startApp = async () => {
    try {
      // await init();
      // Fetch the App Check token
      // const token = await getToken();
      // setAppToken();

      // Fetch the location
      const locationResult = await checkPermissions();

      // Set location state
      setLocation(locationResult);

      // Continue initialization steps
      await initialize();
      

      // Get the sorted mosques using the location and token
      const obj = await getSortedMosques(locationResult);
      setMosqueData(obj);
      
      

      // Set the app as ready
      setIsAppReady(true);
    } catch (e) {
      
      setError(e);
      
    } finally {
      SplashScreen.hideAsync();
      
    }
  };

  async function getAllCollections() {
    try {
      const response = await fetch('https://express-linux-970266916925.us-east1.run.app/allevents');
      if (response.status == 503) {
        
        throw new Error('down');
      }
      const data = await response.json();
      for (let key in data) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          data[key].shift();
        }
      }
      setEvents(data);
      
    } catch (e) {
      
      throw e;
    } 
  }

  useEffect(() => {
    // Start the app on initial render
    
    startApp()
    
    
  
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

  // useEffect to update nextPrayer once mosqueData is set
  useEffect(() => {
    if (mosqueData) {
      setNextPrayer(getNextPrayer(mosqueData[0]));
    }
  }, [mosqueData]);
  if (error) {
    throw error;
  }
  return (
    <ModalContext.Provider value={{
       events, getAllCollections, modal, setModal,
      name, setName, location, mosqueData, isAppReady, startApp, nextPrayer, setNextPrayer, getNextPrayer, setLocation, 
    }}>
      {children}
    </ModalContext.Provider>
  );
};
