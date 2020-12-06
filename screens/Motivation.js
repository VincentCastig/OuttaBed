import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Notifications from 'expo-notifications';
import {responsive, heightResponsive} from './components/Responsive';

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
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>OutABed</Text>
                    </View>

                    <View style={styles.bodyContent}>
                        <View style={styles.authorBox}>
                            <Text style={styles.author}>{notification.request.content.title}</Text>
                        </View>
                        <Text style={styles.quote}>{notification.request.content.data.aps.alert.body}</Text>
                    </View>
                </View>
            );
        }
        else{
            return (
                <View style={styles.loadingWrapper}>
                    <View style={styles.loadingBody}>
                        <Text style={styles.noDataText}>Nothing yet</Text>
                    </View>
                </View>
            )
        }
}



const styles = StyleSheet.create({
    titleContainer:{
        height: responsive(77),
        width: '100%',
        paddingTop: responsive(18),
        backgroundColor: '#292929',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    bodyContent:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: responsive(15)
    },
    title:{
        color: '#fff',
        fontSize: responsive(20),
        marginBottom: responsive(10),
        marginTop: responsive(10),
        alignItems: 'flex-start'
    },
    container:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#000'
    },
    authorBox:{
        borderColor: '#fff',
        borderBottomWidth: responsive(3),
        marginBottom: responsive(18),
        paddingLeft: responsive(10),
        paddingRight: responsive(10)
    },
    author:{
        //fontFamily: 'arial',
        color: '#fff',
        marginTop: responsive(16),
        marginBottom: responsive(4),
        fontSize: responsive(18),
        marginLeft: 'auto',
        fontWeight: "700",
    },
    quote:{
        color: '#fff',
        fontSize: responsive(15)
    },
    loadingWrapper:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#000'
    },
    loadingBody: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    noDataText:{
        color: '#fff',
        fontSize: responsive(15)
    },
});
