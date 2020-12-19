import React from 'react';
import { Button, Image } from 'react-native';
// import { AppLoading } from 'expo';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditTime';
import MotivationScreen from './screens/Motivation';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import registerForPushNotificationsAsync from './notifications';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {responsive, heightResponsive} from './screens/components/Responsive';
import { AppLoading } from 'expo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const tabBarHeight = useBottomTabBarHeight();


export default class App extends React.Component{


    render() {

        return (
            <NavigationContainer headerStyle={{backgroundColor: '#a2a8af'}}>
                <Tab.Navigator
                    barStyle={{
                        // backgroundColor: '#1393ff',
                        height: responsive(66),
                        backgroundColor: '#292929',
                    }}

                    tabBarOptions={{
                        activeTintColor: '#1393ff',
                        inactiveTintColor: "white",
                        style: {
                            backgroundColor: '#292929',
                            borderColor: '#292929',
                            height: responsive(65),
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
                            tabBarIcon: ({color, size}) => (
                                <Image name="home" color={color} size={12} style={{
                                    height: 30,
                                    width: 30,
                                    // backgroundColor: color
                                }}
                                    source={color === '#1393ff' ? require('./assets/HomeIconBlue.png') : require('./assets/HomeIconWhite.png')}/>
                            ),
                        }
                        }
                    />


                    <Tab.Screen
                        name="Motivation"
                        component={MotivationScreen}
                        options={{
                            tabBarIcon: ({color, size}) => (

                                <Image name="home" color={color} size={12} style={{
                                    height: 30,
                                    width: 30,
                                    // backgroundColor: color
                                }}
                                       source={color === '#1393ff' ? require('./assets/LoadingIconBlue.png') : require('./assets/LoadingIconWhite.png')}/>

                            )
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
