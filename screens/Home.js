import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Linking} from 'react-native';
import * as Notifications from 'expo-notifications';
import {responsive, heightResponsive} from './components/Responsive';
import { useFonts, Font } from 'expo-font';
import { AppLoading } from 'expo';
import Constants from "expo-constants/build/Constants";
import axios from "axios/index";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Home ({route}) {
    const {notification} = route.params || '';
    const [quoteInfo, setQuote] = useState([]);
    let [fontsLoaded] = useFonts({
        'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),
        'Noticia_Text': require('../assets/fonts/NoticiaText-Regular.ttf'),
    });

    useEffect(() => {
        axios.get('http://get-up-now.herokuapp.com/get-quote').then(res => {
            const quoteInfo = res.data[0];
            setQuote(quoteInfo);
        }).catch(error => {
            console.log('error ', error)
        });
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    else if (notification) {
        console.log('notification ', notification);
        return (
                <ImageBackground source={require('../assets/pexels-daria-obymaha-1684151.jpg')} style={styles.container}>
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
        );
    }
    else{
        return (
            <ImageBackground source={require('../assets/pexels-daria-obymaha-1684151.jpg')} style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Motivational Quote</Text>
                </View>
                <View style={styles.bodyContent}>
                    <Text style={styles.quote}>{quoteInfo.quote}</Text>
                    <View style={styles.authorBox}>
                        <Text style={styles.author}>~{quoteInfo.author}</Text>
                    </View>
                </View>
            </ImageBackground>
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
        paddingTop: responsive(13)
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
        width: responsive(280)
    },
    author:{
        color: '#000931',
        marginTop: responsive(5),
        marginBottom: responsive(10),
        fontSize: responsive(22),
        marginLeft: 'auto',
        fontWeight: "700",
        fontFamily: 'DancingScript'
    },
    quote:{
        color: '#292929',
        fontSize: responsive(15),
        fontFamily: 'Noticia_Text',
        marginTop: responsive(8),
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
