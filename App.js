import React from 'react';
import { Button } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditTime';
import MotivationScreen from './screens/Motivation';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import registerForPushNotificationsAsync from './notifications';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


function Home() {
    return (
        <Tab.Navigator
            barStyle={{
                backgroundColor: '#1393ff',
                backgroundColor: '#292929',
                color: '#fff',
            }}
            inactiveColor="white"
            activeColor="#1393ff"
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Motivation" component={MotivationScreen} />
        </Tab.Navigator>
    );
}


export default function App() {

  return (
    <NavigationContainer headerStyle={{ backgroundColor: '#a2a8af' }}>
      <Stack.Navigator>
        <Stack.Screen
            name="OutABed"
            component={ Home }
            options={{
                headerTintColor: 'white',
                headerRight: () => (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                    />
                ),
                headerStyle: {
                    backgroundColor: '#1393ff',
                    backgroundColor: '#292929',
                    color: '#fff'
                },
            }}
        />
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
