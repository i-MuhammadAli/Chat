import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/actions/authAction';
import { useColorScheme } from '~/lib/useColorScheme';
import { Link, useRouter } from 'expo-router';
import { Label } from '~/components/ui/label';

export default function Register() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.auth);

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleRegister = () => {
    if (email && password) {
      dispatch(
        register({
          email,
          password,
          onSuccess: () => {
            setEmail('');
            setPassword('');
            router.push('/profile-setup');
          },
        })
      );
    }
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <View className='p-4 native:pb-24 max-w-md gap-6'>
        <View className='gap-1'>
          <H1 className='text-foreground text-center'>Create an account</H1>
          <Muted className='text-base text-center'>
            Enter you email below to create your account
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
          <Input placeholder='Enter your password' value={password} onChangeText={setPassword} />
        </View>
        <Button onPress={handleRegister} disabled={!email || !password || isLoading}>
          {isLoading ? (
            <ActivityIndicator color={isDarkColorScheme ? 'black' : 'white'} />
          ) : (
            <Text>Register</Text>
          )}
        </Button>
        <View className='flex flex-row gap-2 justify-center'>
          <Muted className='text-base'>Already have an account?</Muted>
          <Link href='/login'>
            <Text className='underline font-semibold'>Login</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
