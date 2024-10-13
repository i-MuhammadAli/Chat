import { Tabs } from 'expo-router';
import { ModalToggle } from '~/components/ModalToggle';
import { ThemeToggle } from '~/components/ThemeToggle';
import { MenuSquare } from '~/lib/icons/MenuSquare';
import { MessageSquare } from '~/lib/icons/MessageSquare';
import { Users } from '~/lib/icons/Users';
import HeaderRight from '../components/header/HeaderRight';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='chats'
        options={{
          title: 'Chats',
          tabBarIcon({ color, size }) {
            return <MessageSquare color={color} size={size} />;
          },
          headerLeft: () => <ModalToggle />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tabs.Screen
        name='contacts-old'
        options={{
          title: 'Contacts Old',
          tabBarIcon({ color, size }) {
            return <Users color={color} size={size} />;
          },
          headerLeft: () => <ModalToggle />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name='contacts'
        options={{
          title: 'Contacts',
          tabBarIcon({ color, size }) {
            return <Users color={color} size={size} />;
          },
          headerLeft: () => <ModalToggle />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name='components'
        options={{
          title: 'Components',
          tabBarIcon({ color, size }) {
            return <MenuSquare color={color} size={size} />;
          },
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
