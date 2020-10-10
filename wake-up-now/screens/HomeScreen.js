import React, {Component, useState, useEffect, useRef} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, FlatList, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import TimePicker from '../components/TimePicker';
import Constants from 'expo-constants';
import axios from 'axios';
import expoAxios from '../src/api/expoAxios';
import localHost from '../src/api/localHost';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import registerForPushNotificationsAsync from '../notifications';




export default function HomeScreen({route, navigation}) {
    let [date, setDate] = useState(0);
    const [expoPushToken, setExpoPushToken] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => {
    //         console.log(token);
    //         //setExpoPushToken(token);
    //         sendToken(token);
    //     });
    //
    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //         setNotification(notification);
    //     });
    //
    //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log(response);
    //
    //     });
    //
    //
    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener);
    //         Notifications.removeNotificationSubscription(responseListener);
    //     };
    // }, []);


    // const sendToken = async() => {
        // console.log('sending ', token.data);
        console.log('sending deviceId', Constants.deviceId);

        // localHost.post('/createUser', {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj1]', device_id: 'Constants.deviceId'}).then((res) => console.log(res)).catch((error) => console.log('createUser error ', error));


            axios.post('http://localhost:3000/create-user', {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj2]', device_id: Constants.deviceId}).then((res) => console.log(res)).catch((error) => console.log('createUser error ', error));



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


    // };
    //
    // sendToken();



    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         device_time: props.route.params,
    //     }
    //   }




    // if (!date){
    //     date = new Date(1598051730000);
    //     console.log('default date  ', date);
    //     console.log('device id on home page', Constants.deviceId);
    let id = 'EFBD766B-FB1B-43AA-8189-679AAE20FC71';
        useEffect(() => {
            localHost.get(`/get-time/${Constants.deviceId}`).then(res => {
                console.log(res);
                if (res.data[0].device_id) {
                    const device_time = res.data[0].device_time;
                    setDate(device_time);
                }

            }).catch(error => {
                console.log('the get-device-id error ', error)
            });
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
                onPress={() => navigation.navigate("Edit", {
                    newDate: date
                })}
                  //onPress={() => sendNotification(expoPushToken)}
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
                }
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
