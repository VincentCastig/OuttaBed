import React, {Component, useState, useEffect, useRef} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, FlatList, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import TimePicker from '../components/TimePicker';
import Constants from 'expo-constants';
import axios from 'axios';
import expoAxios from '../src/api/expoAxios';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import registerForPushNotificationsAsync from '../notifications';




export default function HomeScreen({route, navigation}) {
    let [date, setDate] = useState(0);
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);


    const sendNotification = async(expoPushToken) => {
        console.log('sending ', expoPushToken);
        try {
            axios.post('https://exp.host/--/api/v2/push/send', {

                    to: expoPushToken.data,
                    sound: 'default',
                    title: 'Marcus Aurelius',
                    body: 'At dawn, when you have trouble getting out of bed, tell yourself: “I have to go to work — as a human being. What do I have to complain of, if I’m going to do what I was born for — the things I was brought into the world to do? Or is this what I was created for? To huddle under the blankets and stay warm?',
                    // data: {data: 'goes here'},

            }).then((res) => console.log(res));
        }
        catch (e) {
            console.log(e)
        }

        // const message = {
        //     to: token,
        //     sound: 'default',
        //     title: 'Original Title',
        //     body: 'And here is the body!',
        //     data: {data: 'goes here'},
        // };
        //
        // await fetch('https://exp.host/--/api/v2/push/send', {
        //     method: 'POST',
        //     headers: {
        //         accept: 'application/json',
        //         'accept-encoding': 'gzip, deflate',
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(message)
        // })

    };



    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         device_time: props.route.params,
    //     }
    //   }



    // if (!date){
        date = new Date(1598051730000);
        console.log('default date  ', date);
        useEffect(() => {
            axios.get(`http://localhost:3000/get-device-id/${Constants.deviceId}`).then(res => {
                if (res.data[0].device_id) {
                    const device_time = res.data[0].device_time;
                    setDate(device_time);
                }

            }).catch(error => console.log('the error ', error));
        }, []);
    // }


        if (route.params) {
            date = route.params.date;
            console.log(route.params.data)
        }


          let time = "";
          let period = "";

          // if(typeof date == "number"){
            let hours = new Date(date).getUTCHours();
            if(hours >= 12){
              period = "PM"
            }
            else{
              period = "AM"
            }
            time = ((hours + 11) % 12 + 1).toString();
            time += ":";
            if(new Date(date).getUTCMinutes() < 10){
              time += "0" + new Date(date).getUTCMinutes();
            }
            else{
              time += new Date(date).getUTCMinutes();
            }
          // }

          const Item = ({ title }) => (
            <View style={styles.itemBox}>
              <Text style={styles.time}>{title} {period}</Text>
              <Button
                title="Edit Time"
                // onPress={() => navigation.navigate("Edit", {
                //     newDate: date
                // })}
                  onPress={() => sendNotification(expoPushToken)}
                />
            </View>
          );
            const renderItem = ({ item }) => (
                <Item title={item.title} />
              );

              const DATA = [
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  title: time,
                },
                // {
                //   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                //   title: 'Second Item',
                // },
              ];



    return (
        <View style={styles.container }>
            <View>
                <Text style={styles.header}>Motivation Time </Text>
            </View>

            <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onPress={() => navigation.navigate("Edit")}
            />

            </SafeAreaView>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
        marginTop: 10
    },
    itemBox: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      borderWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      width: "100%",
      height: 63
    },
    safeArea: {
      flex: 1
    },
    time:{
      fontSize: 34
    }
});
