import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const IntroScreen = () => {
  return (
    <View>
      <View style={tw``}>
        <Text style={tw` text-black dark:text-white`}>Hello Intro</Text>
      </View>
    </View>
  );
};

export default IntroScreen;
