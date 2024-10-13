import Toast from 'react-native-toast-message';
import { Dispatch } from 'redux';
import { auth, db } from '../../config/firebase';
import { setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface UserCredential {
  user: any;
}

export const register: any = ({ email, password, onSuccess = () => {} }) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'AUTH_PENDING' });
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const payload = {
        uid: user?.uid,
        email: user?.email,
        createdAt: new Date(),
        contactRequestsSent: [],
        contactRequestsReceived: [],
        contacts: [],
      };
      await setDoc(doc(db, 'users', user?.uid), payload);
      await AsyncStorage.setItem('user', JSON.stringify(payload));
      dispatch({ type: 'AUTH_SUCCESS', payload });
      onSuccess();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'An unknown error occurred',
      });
      dispatch({ type: 'AUTH_REJECTED' });
    }
  };
};

export const login: any = ({ email, password, onSuccess = () => {} }) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'AUTH_PENDING' });
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      const payload = {
        uid: user.uid,
        ...userData,
      };

      await AsyncStorage.setItem('user', JSON.stringify(payload));
      dispatch({ type: 'AUTH_SUCCESS', payload });
      onSuccess();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'An unknown error occurred',
      });
      dispatch({ type: 'AUTH_REJECTED' });
    }
  };
};

export const profileSetup: any = ({ uid, profileData, onSuccess = () => {} }) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'PROFILE_SETUP_PENDING' });

    try {
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, profileData);
      dispatch({ type: 'PROFILE_SETUP_SUCCESS', payload: profileData });
      onSuccess();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'An unknown error occurred',
      });
      dispatch({ type: 'PROFILE_SETUP_REJECTED' });
    }
  };
};

export const logout: any = () => {
  return async (dispatch: Dispatch) => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'An unknown error occurred',
      });
    }
  };
};
