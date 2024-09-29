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

// Create a new App Check provider
const rnfbProvider = firebase.appCheck().newReactNativeFirebaseAppCheckProvider();

// Configure the provider specifically for iOS
rnfbProvider.configure({
  apple: {
    provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback', // Use App Attest with DeviceCheck fallback for iOS
    debugToken: '0D9E2AAB-2261-44CF-B686-B89DE9461708', // Optional debug token for testing in development
  },
});

// Initialize App Check for iOS only
firebase.appCheck().initializeAppCheck({
  provider: rnfbProvider,
  isTokenAutoRefreshEnabled: true, // Automatically refresh App Check tokens
});

export default firebase;

