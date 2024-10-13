import React, { useState } from 'react';
import { View, Image, ActivityIndicator, Alert } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';
import { useColorScheme } from '~/lib/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import Svg, { G, Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { profileSetup } from '~/store/actions/authAction';

export default function ProfileSetup() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: any) => state.auth);

  const [username, setUsername] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleProfileSetup = () => {
    const profileData = {
      username,
    };
    if (user?.uid) {
      dispatch(
        profileSetup({
          uid: user?.uid,
          profileData,
          onSuccess: () => {
            router.push('/chats');
          },
        })
      );
    } else {
      Alert.alert('User ID not found!');
    }
  };

  return (
    <View className='flex-1 justify-center items-center p-4'>
      <View className='h-full max-w-md w-full justify-between gap-4'>
        <View>
          <H1 className='text-foreground text-center'>Profile Setup</H1>
          <Muted className='text-base text-center'>Complete your profile details</Muted>
        </View>
        <View className='flex-col gap-4'>
          <View
            className='rounded-full overflow-hidden items-center justify-center mx-auto'
            style={{ width: 150, height: 150 }}
            onTouchEnd={handleChoosePhoto}
          >
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={{ width: '100%', height: '100%', borderRadius: 50 }}
              />
            ) : (
              <Svg viewBox='0 0 15 15' fill='none'>
                <G fill={isDarkColorScheme ? '#fff' : '#000'}>
                  <Path d='M5 5.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z' />
                  <Path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.5 0a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM1 7.5a6.5 6.5 0 1110.988 4.702A3.5 3.5 0 008.5 9h-2a3.5 3.5 0 00-3.488 3.202A6.482 6.482 0 011 7.5z'
                  />
                </G>
              </Svg>
            )}
          </View>
          <View className='flex-row justify-between items-end'>
            <Label nativeID='username'>Username</Label>
            <Muted className='text-sm text-red-500'>Required *</Muted>
          </View>
          <Input
            nativeID='username'
            placeholder='Enter your username'
            value={username}
            onChangeText={setUsername}
          />
          <Label nativeID='about'>About</Label>
          <Textarea
            nativeID='about'
            placeholder='About (optional)'
            value={about}
            onChangeText={setAbout}
            multiline
          />
        </View>
        <Button onPress={handleProfileSetup} disabled={isLoading || !username}>
          {isLoading ? (
            <ActivityIndicator color={isDarkColorScheme ? 'black' : 'white'} />
          ) : (
            <Text>Finish</Text>
          )}
        </Button>
      </View>
    </View>
  );
}
