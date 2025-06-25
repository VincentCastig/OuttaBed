import React from 'react';
import { Image } from 'react-native';
import Home from './screens/Home';
import Notification from './screens/Notification';
import { responsive } from './screens/components/Responsive';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#1393ff',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#292929',
            height: responsive(67),
            borderTopColor: '#292929',
            borderTopWidth: 1,
            paddingTop: responsive(7),
          },
          tabBarLabelStyle: {
            fontSize: responsive(12),
          },
          tabBarIcon: ({ color, size }) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource =
                color === '#1393ff'
                  ? require('./assets/HomeIconBlue.png')
                  : require('./assets/HomeIconWhite.png');
            } else if (route.name === 'Notification') {
              iconSource =
                color === '#1393ff'
                  ? require('./assets/LoadingIconBlue.png')
                  : require('./assets/LoadingIconWhite.png');
            }

            return (
              <Image
                source={iconSource}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notification" component={Notification} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
