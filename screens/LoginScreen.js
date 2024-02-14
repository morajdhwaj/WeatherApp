import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}) => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  // Somewhere in your code
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      navigation.navigate('HomeScreen');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(' some other error happened');
        navigation.navigate('HomeScreen');
      }
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-200 items-center justify-center`}>
      <TouchableOpacity
        style={tw`border p-2 rounded-lg flex-row items-center justify-center gap-2`}
        onPress={googleLogin}>
        <Image
          source={require('../assets/images/google.png')}
          ImageBackground
          style={tw`h-10 w-10 rounded-full`}
        />
        <Text style={tw`text-black font-bold text-2xl`}>
          Sign up with google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
