import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import * as Notifications from 'expo-notifications';
import {responsive, heightResponsive} from './components/Responsive';
import { useFonts, Font } from 'expo-font';
import { AppLoading } from 'expo';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Motivation ({route}) {
    const {notification} = route.params || '';
    let [fontsLoaded] = useFonts({
        'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),
        'Noticia_Text': require('../assets/fonts/NoticiaText-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else if (notification) {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/pexels-patryk-kamenczak-775219.jpg')} style={styles.image}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Motivational Quote</Text>
                    </View>

                    <View style={styles.bodyContent}>
                        <Text style={styles.quote}>{notification.request.content.data.aps.alert.body}</Text>
                        <View style={styles.authorBox}>
                            <Text style={styles.author}>~{notification.request.content.title}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    else{
        return (
            //<View>
            <ImageBackground source={require('../assets/pexels-eberhard-grossgasteiger-2088210.jpg')} style={styles.loadingWrapper}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Motivational Quote</Text>
                </View>
                <View style={styles.loadingBody}>
                    <Text style={styles.noDataText}>Nothing yet</Text>
                </View>
            </ImageBackground>
            // </View>
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
        padding: responsive(18),
        // backgroundColor: 'red'
    },
    title:{
        color: '#fff',
        fontSize: responsive(27),
        marginBottom: responsive(10),
        marginTop: responsive(10),
        fontFamily: 'DancingScript',
    },
    container:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        //backgroundColor: '#000'
    },
    authorBox:{
        borderColor: '#fff',
        // borderBottomWidth: responsive(1),
        marginTop: responsive(5),
        paddingLeft: responsive(10),
        paddingRight: responsive(10),
        alignItems: 'center',
        // backgroundColor: '#fff',
        width: responsive(280)
    },
    author:{
        //fontFamily: 'arial',
        color: '#fff',
        marginTop: responsive(10),
        marginBottom: responsive(10),
        fontSize: responsive(22),
        marginLeft: 'auto',
        fontWeight: "700",
        fontFamily: 'DancingScript'
    },
    quote:{
        color: '#fff',
        fontSize: responsive(15),
        fontFamily: 'Noticia_Text',
        marginTop: responsive(40),
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
        //backgroundColor: '#000'
    },
    noDataText:{
        color: '#fff',
        fontSize: responsive(15)
    },
    image:{
        alignItems: 'center',
    },
});
