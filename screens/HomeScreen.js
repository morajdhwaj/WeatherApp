import {View, Text, Button} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('DetailSCreen')}
      />
      <Button
        title="Go to Intro"
        onPress={() => navigation.navigate('IntroScreen')}
      />
    </View>
  );
};

export default HomeScreen;
