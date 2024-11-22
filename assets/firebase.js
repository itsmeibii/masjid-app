// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDDOoMgWGcJu3M1aP0WElfl_ceJuNcZA2g",
//   authDomain: "masjid-app-b68d9.firebaseapp.com",
//   databaseURL: "https://masjid-app-b68d9-default-rtdb.firebaseio.com",
//   projectId: "masjid-app-b68d9",
//   storageBucket: "masjid-app-b68d9.appspot.com",
//   messagingSenderId: "970266916925",
//   appId: "1:970266916925:web:5e76a4f86e87b858731254",
//   measurementId: "G-WBX11PMD62"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize App Check with reCAPTCHA
// export default appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('6LeWKlIqAAAAADyIIOJaCMiR8JNB1pAC-onykeGq'),  // Replace with your reCAPTCHA site key
//   isTokenAutoRefreshEnabled: true  // Optional, automatically refresh App Check token
// });
import { firebase } from '@react-native-firebase/app';
import appCheck from '@react-native-firebase/app-check';

// Helper function to introduce delay (500 ms)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Create a new App Check provider
const rnfbProvider = firebase.appCheck().newReactNativeFirebaseAppCheckProvider();

async function initializeAppCheckWithRetry(retries = 3) {
  let attempts = 0;
  while (attempts < retries) {
    try {
      // Configure the provider specifically for iOS and Android
      rnfbProvider.configure({
        apple: {
          provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback', // Use App Attest with DeviceCheck fallback for iOS
          debugToken: '0D9E2AAB-2261-44CF-B686-B89DE9461708', // Optional debug token for testing in development
        },
        android: {
          provider: __DEV__ ? 'debug' : 'playIntegrity', // Use Play Integrity for Android
          debugToken: 'EBF8C57D-C447-46D7-9A72-D1755C927FC3', // Optional debug token for Android
        },
      });

      // Initialize App Check for iOS and Android
      firebase.appCheck().initializeAppCheck({
        provider: rnfbProvider,
        isTokenAutoRefreshEnabled: true, // Automatically refresh App Check tokens
      });

      
      break; // Break out of the loop if successful
    } catch (e) {
      attempts += 1;
      console.error(`Attempt ${attempts} failed: ${e.message}`);

      if (attempts < retries) {
        // Wait 500 ms before retrying
        await delay(500);
        
      } else {
        
        throw e; // Rethrow the error if all attempts fail
      }
    }
  }
}

// Call the retry initialization function
function initappcheck (){
  return new Promise((resolve, reject) => {
    initializeAppCheckWithRetry(2)
    .then(() => {
      resolve('AppCheck initialized successfully');
    })
    .catch((e) => {
      reject(`Failed to initialize AppCheck: ${e.message}`);
    });
  });
}


export default initappcheck;


