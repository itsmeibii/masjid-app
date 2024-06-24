// import { View, Text, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { FBAUTH } from './index';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// export default function login() {
//     const [email,setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const auth = FBAUTH;
//     const signIn = async() => {
//         setLoading(true);
//         try {
//             const response = await signInWithEmailAndPassword(auth,email,password);
//             console.log(response);
           
            
//         } catch (error) {
//             console.error(error);
//             //Alert.alert('Sign in Failed')
//         } finally {
//             setLoading(false);
//         }
//     }
//     const signUp = async() => {
//         setLoading(true);
//         try {
//             const response = await createUserWithEmailAndPassword(auth,email,password);
//             console.log(response);
           
            
//         } catch (error) {
//             console.error(error);
//             //Alert.alert('Sign in Failed')
//         } finally {
//             setLoading(false);
//         }
//     }
//   return (
//     <View>
//       <Text>login</Text>
//     </View>
//   )
// }