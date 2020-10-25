import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

// This refers to the function defined earlier in this guide, in Push Notifications Set Up
import registerForPushNotificationsAsync from '../notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Motivation ({route, navigation}) {
        const {notification} = route.params;

        console.log('notification route.params ', notification);

        return (
            <View style={ styles.container }>
                {/*<Text>Your expo push token: {this.state.expoPushToken}</Text>*/}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification.request.content.title}</Text>
                    <Text>{notification.request.content.body}</Text>
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
