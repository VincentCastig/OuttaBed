import React from 'react';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditTime';
import MotivationScreen from './screens/Motivation';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import registerForPushNotificationsAsync from './notifications';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ HomeScreen } />
        <Stack.Screen name="Edit" component={ EditScreen } options={{ title: 'Edit' }}/>
        <Stack.Screen name="Motivation" component={ MotivationScreen } options={{ title: 'Why get up?' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
