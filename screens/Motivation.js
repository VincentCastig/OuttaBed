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
        const {notification} = route.params || '';
        if (notification) {
            return (
                <View style={styles.container}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.author}>{notification.request.content.title}</Text>
                        <Text style={styles.quote}>{notification.request.content.body}</Text>
                    </View>
                </View>
            );
        }
        else{
            return (
                <View>
                    <Text>Nothing yet</Text>
                </View>
            )
        }
}
