import { Link } from 'expo-router';
import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

// Sample contacts data
const contacts = [
  {
    id: '1',
    name: 'John Doe',
    lastMessageTime: '10:30 AM',
    lastMessage: 'Hey, how are you?',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Jane Smith ad asd asdaljksd alskdja sldkjal ksdj',
    lastMessageTime: '9:45 AM',
    lastMessage: 'Are we still on for lunch?',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Emily Johnson',
    lastMessageTime: 'Yesterday',
    lastMessage: 'See you later asd asdadadasd ada ads asdad ads ada sd!',
    unreadCount: 1,
  },
];

export default function ContactsPage() {
  return (
    <View className='flex-1'>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactCard contact={item} />}
      />
    </View>
  );
}

function ContactCard({ contact }) {
  return (
    <Card className='flex-row items-center gap-5 p-6 overflow-hidden'>
      <Avatar alt='12'>
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>{contact.name.charAt(0)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className='flex-1 overflow-hidden'>
        {/* Parent view with flex-row to ensure proper alignment */}
        <View className='max-w-full flex-row justify-between items-center'>
          <Text numberOfLines={1} className='text-lg font-semibold'>
            {contact.name}
          </Text>
          <View>
            <Text className='text-sm text-muted-foreground'>{contact.lastMessageTime}</Text>
          </View>
        </View>
        <View className='flex-row justify-between items-center'>
          <Text numberOfLines={1} className='text-muted-foreground'>
            {contact.lastMessage}
          </Text>
          {contact.unreadCount > 0 && (
            <View className='bg-red-500 rounded-full px-2 py-1'>
              <Text className='text-white text-xs'>{contact.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}
