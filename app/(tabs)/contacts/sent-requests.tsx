import { Link } from 'expo-router';
import * as React from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '~/components/ui/badge';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useColorScheme } from '~/lib/useColorScheme';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFriendRequest,
  fetchSentFriendRequests,
  sendFriendRequest,
} from '~/store/actions/contactAction';
import { Check } from '~/lib/icons/Check';
import { X } from '~/lib/icons/X';

export default function Contacts() {
  const dispatch = useDispatch();
  const { isDarkColorScheme } = useColorScheme();
  const { user } = useSelector((state: any) => state.auth);
  const { sentRequests } = useSelector((state: any) => state.contact);

  const handleDeleteRequest = (request: any) => {
    dispatch(
      deleteFriendRequest({
        senderUid: request?.senderUid,
        recipientUid: request?.recipientUid,
      })
    );
  };

  React.useEffect(() => {
    if (user?.uid) {
      dispatch(fetchSentFriendRequests(user?.uid));
    }
  }, []);

  return (
    <>
      <View className='flex-1'>
        <FlatList
          data={sentRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RequestCard contact={item} handleDeleteRequest={handleDeleteRequest} />
          )}
        />
      </View>
    </>
  );
}

function RequestCard({ contact, handleDeleteRequest }) {
  return (
    <Card className='flex-row items-center gap-5 p-6 overflow-hidden'>
      <Avatar alt='Avatar'>
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>{contact?.recipientUsername?.charAt(0)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className='flex-1 overflow-hidden'>
        <View className='flex-row justify-between items-center'>
          <Text numberOfLines={2} className='text-lg font-semibold flex-1 mr-2'>
            {contact?.recipientUsername}
          </Text>
          <View className='flex-row justify-end items-center'>
            <TouchableOpacity
              activeOpacity={0.8}
              className='bg-red-500 rounded-full p-2 w-12 h-12 items-center justify-center'
              onPress={() => handleDeleteRequest(contact)}
            >
              <X color='white' size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
}
