// In App.js in a new project

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import IntroScreen from './screens/IntroScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailSCreen" component={DetailScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
