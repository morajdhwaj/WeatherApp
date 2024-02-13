import {View, Button, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const DetailScreen = ({navigation}) => {
  return (
    <View>
      <View style={tw``}>
        <Text style={tw` text-black dark:text-white`}>Hello World</Text>
      </View>
    </View>
  );
};

export default DetailScreen;
