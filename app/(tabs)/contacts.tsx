import { Link } from 'expo-router';
import * as React from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
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
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useSelector } from 'react-redux';

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
  const { user } = useSelector((state: any) => state.auth);
  console.log('user: ', user);
  return (
    <>
      <View className='flex-1'>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ContactCard contact={item} />}
        />
        <Dialog>
          <DialogTrigger asChild>
            <TouchableOpacity
              className='absolute right-6 bottom-6 w-16 h-16 rounded-full bg-purple-600 items-center justify-center shadow-lg'
              activeOpacity={0.8}
              onPress={() => {}}
            >
              <Ionicons name='add' size={30} color='white' />
            </TouchableOpacity>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
              <DialogDescription>
                Please provide contact information to send friend request.
              </DialogDescription>
            </DialogHeader>
            <Label nativeID='email'>Email</Label>
            <Input placeholder='name@example.com' />
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>Send Request</Text>
                </Button>
              </DialogClose>
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
