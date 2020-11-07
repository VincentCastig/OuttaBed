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

        return (
            <View style={ styles.container }>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.author}>{notification.request.content.title}</Text>
                    <Text style={styles.quote}>{notification.request.content.body}</Text>
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20
    },
    author:{
        fontSize: 22,
        marginBottom: 15,
        textDecorationLine: 'underline'
    },
    quote:{
        fontSize: 16
    }
});
