import { Link } from 'expo-router';
import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';

const chats = [
  {
    id: '1',
    name: 'John Doe',
    lastMessageTime: '10:30 AM',
    lastMessage: 'Hey, how are you?',
    unreadCount: 0,
  },
  {
    id: '2',
    name: 'Jane Smith ad asd asdaljksd alskdja sldkjal ksdj',
    lastMessageTime: '9:45 AM',
    lastMessage: 'Are we still on for lunch?',
    unreadCount: 20,
  },
  {
    id: '3',
    name: 'Emily Johnson',
    lastMessageTime: 'Yesterday',
    lastMessage: 'See you later asd asdadadasd ada ads asdad ads ada sd!',
    unreadCount: 100,
  },
];

export default function Chats() {
  return (
    <View className='flex-1'>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatCard chat={item} />}
      />
    </View>
  );
}

function ChatCard({ chat }) {
  return (
    <Card className='flex-row items-center gap-5 p-6 overflow-hidden'>
      <Avatar alt='12'>
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>{chat?.name.charAt(0)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className='flex-1'>
        <View className='flex-row justify-between items-center'>
          <Text numberOfLines={1} className='text-lg font-semibold flex-1 mr-2'>
            {chat?.name}
          </Text>

          <View className='flex-shrink-0'>
            <Text className='text-sm text-muted-foreground'>{chat?.lastMessageTime}</Text>
          </View>
        </View>

        <View className='flex-row justify-between items-center'>
          <Text numberOfLines={1} className='text-muted-foreground flex-1 mr-2'>
            {chat?.lastMessage}
          </Text>
          {chat.unreadCount > 0 && (
            <View className='bg-purple-600 rounded-full px-2 py-1 flex-shrink-0'>
              <Text className='text-white text-sm font-bold'>{chat?.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}
