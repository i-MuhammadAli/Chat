import Toast from 'react-native-toast-message';
import { Dispatch } from 'redux';
import { db } from '../../config/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';

// export const fetchFriendRequests: any = (uid: string) => {
//   return (dispatch: Dispatch) => {
//     try {
//       const requestsRef = collection(db, 'requests');
//       const q = query(requestsRef, where('recipientUid', '==', uid));

//       onSnapshot(
//         q,
//         (querySnapshot) => {
//           const friendRequests = [];
//           querySnapshot.forEach((doc) => {
//             friendRequests.push({ id: doc.id, ...doc.data() });
//           });
//           dispatch({
//             type: 'FRIEND_REQUESTS_SUCCESS',
//             payload: friendRequests,
//           });
//         },
//         (error) => {
//           Toast.show({
//             type: 'error',
//             text1: 'Error!',
//             text2: error.message || 'Failed to fetch friend requests',
//           });
//         }
//       );
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error!',
//         text2: error.message || 'Failed to fetch friend requests',
//       });
//     }
//   };
// };

// export const fetchSentFriendRequests: any = (uid: string) => {
//   return (dispatch: Dispatch) => {
//     try {
//       const requestsRef = collection(db, 'requests');
//       const q = query(requestsRef, where('senderUid', '==', uid));

//       onSnapshot(
//         q,
//         (querySnapshot) => {
//           const sentRequests = [];
//           querySnapshot.forEach((doc) => {
//             sentRequests.push({ id: doc.id, ...doc.data() });
//           });
//           dispatch({
//             type: 'SENT_FRIEND_REQUESTS_SUCCESS',
//             payload: sentRequests,
//           });
//         },
//         (error) => {
//           Toast.show({
//             type: 'error',
//             text1: 'Error!',
//             text2: error.message || 'Failed to fetch sent friend requests',
//           });
//         }
//       );
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error!',
//         text2: error.message || 'Failed to fetch sent friend requests',
//       });
//     }
//   };
// };

interface FetchFriendRequestsParams {
  uid: string;
  type: 'received' | 'sent';
}

export const fetchRequests: any = (uid: string) => {
  return (dispatch: Dispatch) => {
    try {
      const requestsRef = collection(db, 'requests');
      // Query for received friend requests
      const receivedQuery = query(requestsRef, where('recipientUid', '==', uid));
      // Query for sent friend requests
      const sentQuery = query(requestsRef, where('senderUid', '==', uid));

      const receivedRequests: any[] = [];
      const sentRequests: any[] = [];

      // Use Promise.all to fetch both sent and received requests in parallel
      Promise.all([
        new Promise<void>((resolve, reject) => {
          onSnapshot(
            receivedQuery,
            (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                receivedRequests.push({ id: doc.id, ...doc.data() });
              });
              resolve();
            },
            reject
          );
        }),
        new Promise<void>((resolve, reject) => {
          onSnapshot(
            sentQuery,
            (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                sentRequests.push({ id: doc.id, ...doc.data() });
              });
              resolve();
            },
            reject
          );
        }),
      ])
        .then(() => {
          // Dispatch both received and sent friend requests
          dispatch({
            type: 'FRIEND_REQUESTS_SUCCESS',
            payload: { receivedRequests, sentRequests },
          });
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: error.message || 'Failed to fetch friend requests',
          });
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'Failed to fetch friend requests',
      });
    }
  };
};

export const sendFriendRequest: any = ({
  senderUid,
  recipientEmail,
  onSuccess = () => {},
  onError = () => {},
}) => {
  return async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', recipientEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('User not found with this email');
      }

      const recipientDoc = querySnapshot.docs[0];
      const recipientUid = recipientDoc.id;

      const requestQuery = query(
        collection(db, 'requests'),
        where('senderUid', '==', senderUid),
        where('recipientUid', '==', recipientUid)
      );
      const requestSnapshot = await getDocs(requestQuery);

      if (!requestSnapshot.empty) {
        throw new Error('Friend request already sent');
      }

      const reverseRequestQuery = query(
        collection(db, 'requests'),
        where('senderUid', '==', recipientUid),
        where('recipientUid', '==', senderUid)
      );
      const reverseRequestSnapshot = await getDocs(reverseRequestQuery);

      if (!reverseRequestSnapshot.empty) {
        throw new Error('You have already received a friend request from this user');
      }

      const senderDoc = await getDocs(query(usersRef, where('uid', '==', senderUid)));
      const senderData = senderDoc.docs[0]?.data();
      const senderUsername = senderData?.username || 'Unknown User';
      const recipientUsername = recipientDoc.data().username || 'Unknown User';

      const requestRef = doc(collection(db, 'requests'));
      await setDoc(requestRef, {
        senderUid,
        recipientUid,
        senderUsername,
        recipientUsername,
        status: 'pending',
        createdAt: new Date(),
      });

      onSuccess();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'Failed to send friend request',
      });
      onError();
    }
  };
};

export const deleteFriendRequest: any = ({ senderUid, recipientUid }) => {
  return async () => {
    try {
      const requestsRef = collection(db, 'requests');
      const requestQuery = query(
        requestsRef,
        where('senderUid', '==', senderUid),
        where('recipientUid', '==', recipientUid)
      );
      const requestSnapshot = await getDocs(requestQuery);

      if (requestSnapshot.empty) {
        throw new Error('Friend request not found');
      }

      const requestDoc = requestSnapshot.docs[0];
      const requestDocRef = doc(db, 'requests', requestDoc.id);

      await deleteDoc(requestDocRef);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'Failed to delete friend request',
      });
    }
  };
};
