import { PortalHost, useModalPortalRoot } from '@rn-primitives/portal';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authAction';
import { useColorScheme } from '~/lib/useColorScheme';
import { Link, useRouter } from 'expo-router';
import { Label } from '~/components/ui/label';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDarkColorScheme } = useColorScheme();
  const { isLoading } = useSelector((state: any) => state.auth);

  const [email, setEmail] = React.useState<string>('1@gmail.com');
  const [password, setPassword] = React.useState<string>('1234567');

  const handleLogin = () => {
    if (email && password) {
      dispatch(
        login({
          email,
          password,
          onSuccess: () => {
            setEmail('');
            setPassword('');
            router.push('/chats');
          },
        })
      );
    }
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <View className='p-4 native:pb-24 max-w-md gap-6'>
        <View className='gap-1'>
          <H1 className='text-foreground text-center' onPress={() => router.push('/chats')}>
            Login to your account
          </H1>
          <Muted className='text-base text-center'>
            Enter you email below to login your account
          </Muted>
        </View>
        <View>
          <Label nativeID='email' className='mb-2'>
            Email
          </Label>
          <Input placeholder='name@example.com' value={email} onChangeText={setEmail} />
        </View>
        <View>
          <Label nativeID='password' className='mb-2'>
            Password
          </Label>
          <Input
            placeholder='Enter your password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button onPress={handleLogin} disabled={!email || !password || isLoading}>
          {isLoading ? (
            <ActivityIndicator color={isDarkColorScheme ? 'black' : 'white'} />
          ) : (
            <Text>Login</Text>
          )}
        </Button>
        <View className='flex flex-row gap-2 justify-center'>
          <Muted className='text-base'>Don't have an account?</Muted>
          <Link href='/register'>
            <Text className='underline font-semibold'>Register</Text>
          </Link>
        </View>

        {/* <>
            <View className='flex-row items-center gap-3'>
              <View className='flex-1 h-px bg-muted' />
              <Muted>OR CONTINUE WITH</Muted>
              <View className='flex-1 h-px bg-muted' />
            </View>
            <Button>
              <Text>Github</Text>
            </Button>
            <View>
              <Muted className='text-center'>
                By creating an account, you agree to our{' '}
                <Muted className='underline'>Terms of Service</Muted> and{' '}
                <Muted className='underline'>Privacy Policy</Muted>
              </Muted>
            </View>
          </> */}
      </View>
    </View>
  );
}
