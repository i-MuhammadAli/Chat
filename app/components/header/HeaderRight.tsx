import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeToggle } from '~/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';
import { LogOut } from '~/lib/icons/LogOut';
import { Activity } from '~/lib/icons/Activity';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/store/actions/authAction';

export default function HeaderRight() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const triggerRef = React.useRef<React.ElementRef<typeof DropdownMenuTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View className='flex-row gap-4 pr-4'>
      <ThemeToggle />
      <Pressable
        onPress={() => {
          triggerRef.current?.open();
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger ref={triggerRef} asChild>
          <Activity className='text-foreground' size={23} strokeWidth={1.25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={contentInsets} className='mt-4 native:shadow-md'>
          <DropdownMenuLabel>{user?.username || 'My Account'}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className='text-foreground' size={14} />
            <Text onPress={handleLogout}>Log out</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
