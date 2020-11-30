import React from 'react';
import { Button, Image } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditTime';
import MotivationScreen from './screens/Motivation';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import registerForPushNotificationsAsync from './notifications';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {responsive, heightResponsive} from './screens/components/Responsive';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const tabBarHeight = useBottomTabBarHeight();


export default function App() {

    return (
        <NavigationContainer headerStyle={{backgroundColor: '#a2a8af'}}>
            <Tab.Navigator
                barStyle={{
                    // backgroundColor: '#1393ff',
                    //height: responsive(66),
                    backgroundColor: '#292929',
                }}

                tabBarOptions={{
                    activeTintColor: '#1393ff',
                    inactiveTintColor: "white",
                    style: {
                        backgroundColor: '#292929',
                        height: heightResponsive(36),
                        alignItems: 'center'
                        //backgroundColor: '#fff'
                    },
                    labelStyle: {
                        fontSize: responsive(12),
                    }
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Motivation"
                    component={MotivationScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (

                                    <Image name="home" color={color} size={12} style={{
                                        height: 30,
                                        width: 30,
                                        // backgroundColor: color
                                    }} source={color === 'White' ? require('./assets/LoadingIconBlue.png') : require('./assets/LoadingIconWhite.png')}/>

                        )
                    }}
                />
            </Tab.Navigator>
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
