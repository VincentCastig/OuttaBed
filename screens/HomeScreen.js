import React, {Component, useState, useEffect, useRef} from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, FlatList, Button, Switch } from 'react-native';
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
    const [isEnabled, setIsEnabled] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log(token);
            //setExpoPushToken(token);
            // sendToken(token);
        });



        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('listener ', response.notification);
            navigation.navigate("Motivation", {
                notification: response.notification
            });
            console.log('listen');
        });


        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);


    // const sendToken = async() => {
        // console.log('sending ', token.data);
        console.log('sending deviceId', Constants.deviceId);

        // localHost.post('/createUser', {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj1]', device_id: 'Constants.deviceId'}).then((res) => console.log(res)).catch((error) => console.log('createUser error ', error));


            axios.post('https://get-up-now.herokuapp.com/create-user', {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj]', device_id: Constants.deviceId}).then((res) => console.log(res.data)).catch((error) => console.log('createUser error ', error));




        // const message = {
        //     to: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj]',
        //     sound: 'default',
        //     title: 'Original Title',
        //     body: 'And here is the body!',
        //     data: {data: 'goes here'},
        // };

    // try {
    //     expoAxios.post('/', {
    //
    //         to: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj]',
    //         sound: 'default',
    //         title: 'Marcus Aurelius',
    //         body: 'At dawn, when you have trouble getting out of bed, tell yourself: “I have to go to work — as a human being. What do I have to complain of, if I’m going to do what I was born for — the things I was brought into the world to do? Or is this what I was created for? To huddle under the blankets and stay warm?',
    //         // data: {data: 'goes here'},
    //
    //     }).then((res) => console.log(res));
    // }
    // catch (e) {
    //     console.log(e)
    // }



    // };
    //
    // sendToken();



    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         device_time: props.route.params,
    //     }
    //   }




    if (!date) {
        date = new Date(1598051730000);
    }


        useEffect(() => {
            console.log('Constants.deviceId ', Constants.deviceId);
            localHost.get(`/get-time/${Constants.deviceId}`).then(res => {
                if (res.data) {
                    console.log('datas ', res.data);
                    const device_time = res.data[0].device_time;
                    setDate(device_time);
                    console.log('device_time ', device_time)
                }

            }).catch(error => {
                console.log('the get-device-id error ', error)

            });
        }, []);
    // }


        if (route.params) {
            date = route.params.date;
            console.log('route.params.data ', route.params.date)
        }
        else{
            date = Date.parse(date);
            console.log('parse ', date)
        }




          let time = "";
          let period = "";

          // if(typeof date == "number"){
            console.log(new Date(date));
            let hours = new Date(date).getHours();
            if(hours >= 12){
              period = "PM"
            }
            else{
              period = "AM"
            }
            time = ((hours + 11) % 12 + 1).toString();
            time += ":";
            if(new Date(date).getMinutes() < 10){
              time += "0" + new Date(date).getMinutes();
            }
            else{
              time += new Date(date).getMinutes();
            }

            console.log('date ', date);
            console.log('type of date ', date);
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

              const toggleSwitch = () => {
                  setIsEnabled(!isEnabled);
                  console.log('toggle')
              };


    return (

        <View style={styles.container }>
            <View>
                <Text style={styles.header}>Motivation Time </Text>
            </View>

            <View style={styles.bodyArea}>
                <View style={styles.contentBox}>
                    <View style={styles.timeBox}>
                        <Text style={styles.time}>{time} {period}</Text>
                        <Switch
                            trackColor={{ false: "#000000", true: "#25ff24" }}
                            thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    <View style={styles.editBox}>
                        <Button
                            style={styles.editButton}
                            color="#fff"
                            title="Edit Time"
                            onPress={() => navigation.navigate("Edit", {
                                newDate: date
                            })}
                            //onPress={() => sendNotification(expoPushToken)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // borderColor: 'red',
        // borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: '#fff',
        fontSize: 30,
        marginBottom: 20,
        marginTop: 10
    },
    bodyArea: {
        flex: 1
    },
    contentBox: {
        marginTop: 60,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      borderWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      width: "80%",
      height: 200,
    },
    timeBox:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: '#fff',
        borderTopWidth: 2,
        borderBottomWidth:2
    },
    time:{
      color: '#fff',
      fontSize: 65
    },
    editBox:{
        //backgroundColor: '#4043ff',
        borderRadius: 4,
        color: '#ff6773',
        borderColor: '#ffd61d',
        width:120,
        borderWidth: 1,
    },
    editButton:{
        color: '#ff0006'
    }
});
