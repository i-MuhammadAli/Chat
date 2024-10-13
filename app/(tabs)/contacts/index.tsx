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
import { sendFriendRequest } from '~/store/actions/contactAction';

const contacts = [
  {
    id: '1',
    name: 'John Doe',
    about: 'Loves hiking and outdoor adventures',
  },
  {
    id: '2',
    name: 'Jane Smith',
    about: 'Software engineer, passionate about AI',
  },
  {
    id: '3',
    name: 'Emily Johnson',
    about: 'Photographer and traveler',
  },
  {
    id: '4',
    name: 'Robert Brown',
    about: 'Guitarist and music lover',
  },
];

export default function Contacts() {
  const dispatch = useDispatch();
  const { isDarkColorScheme } = useColorScheme();
  const { user } = useSelector((state: any) => state.auth);

  const [recipientEmail, setRecipientEmail] = React.useState<string>('');
  const [requestModal, setRequestModal] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRequestModalToggle = () => {
    if (requestModal) {
      setRecipientEmail('');
      setError('');
      setIsLoading(false);
    }
    setRequestModal(!requestModal);
  };

  const handleSendFriendRequest = () => {
    setIsLoading(true);
    setError('');
    if (!validateEmail(recipientEmail)) {
      setTimeout(() => {
        setError('Please enter a valid email address');
        setIsLoading(false);
      }, 100);
      return;
    }
    if (recipientEmail === user?.email) {
      setTimeout(() => {
        setError("You can't send friend request to yourself.");
        setIsLoading(false);
      }, 100);
      return;
    }
    dispatch(
      sendFriendRequest({
        senderUid: user?.uid,
        recipientEmail,
        onSuccess: handleRequestModalToggle,
        onError: () => setIsLoading(false),
      })
    );
  };

  return (
    <>
      <View className='flex-1'>
        <Text>{user?.username || 'N/A12113'}</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ContactCard contact={item} />}
        />
        <Dialog open={requestModal} onOpenChange={handleRequestModalToggle}>
          <DialogTrigger asChild>
            <TouchableOpacity
              className='absolute right-6 bottom-6 w-16 h-16 rounded-full bg-purple-600 items-center justify-center shadow-lg'
              activeOpacity={0.8}
            >
              <Ionicons name='add' size={30} color='white' />
            </TouchableOpacity>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Send Friend Request</DialogTitle>
              <DialogDescription>
                Please provide contact information to send friend request.
              </DialogDescription>
            </DialogHeader>
            <Label nativeID='recipientEmail'>Email</Label>
            <View>
              <Input
                placeholder='name@example.com'
                keyboardType='email-address'
                value={recipientEmail}
                onChangeText={setRecipientEmail}
              />
              {error && <Text className='text-red-500 mt-1'>{error}</Text>}
            </View>
            <DialogFooter>
              <Button onPress={handleSendFriendRequest} disabled={!recipientEmail || isLoading}>
                {isLoading ? (
                  <ActivityIndicator color={isDarkColorScheme ? 'black' : 'white'} />
                ) : (
                  <Text>Send Request</Text>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    </>
  );
}

function ContactCard({ contact }) {
  return (
    <Card className='flex-row items-center gap-5 p-6 overflow-hidden'>
      <Avatar alt='Avatar'>
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>{contact?.name.charAt(0)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className='flex-1 overflow-hidden'>
        <View className='flex-row justify-between items-center'>
          <Text numberOfLines={2} className='text-lg font-semibold flex-1 mr-2'>
            {contact?.name}
          </Text>
        </View>

        <Text numberOfLines={2} className='text-muted-foreground flex-1'>
          {contact?.about}
        </Text>
      </View>
    </Card>
  );
}
