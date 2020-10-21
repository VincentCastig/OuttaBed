import React from 'react';
import { Text, View } from 'react-native';
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*<Text>Your expo push token: {this.state.expoPushToken}</Text>*/}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification.request.content.title}</Text>
                    <Text>Body: {notification.request.content.body}</Text>
                    <Text>Data: {JSON.stringify(notification.request.content.data)}</Text>
                </View>
            </View>
        );
}
