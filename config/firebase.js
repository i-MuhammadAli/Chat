import { initializeApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBpHMvAZxww0KagR2LMixApTZxdFrP9P_I',
  authDomain: 'connect-994c4.firebaseapp.com',
  projectId: 'connect-994c4',
  storageBucket: 'connect-994c4.appspot.com',
  messagingSenderId: '246396229202',
  appId: '1:246396229202:web:0d745a01273aaa1c61318b',
  measurementId: 'G-6X3G95NB2G',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  storage: AsyncStorage,
});
const db = getFirestore(app);

export { auth, db };
