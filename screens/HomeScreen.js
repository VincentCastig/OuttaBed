import React, {Component, useState, ListView, useEffect, useRef} from 'react';
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
import Item from './ListItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';




export default function HomeScreen({route, navigation}) {
    let [userInfo, setUserInfo] = useState([{'id': 0, 'device_time': new Date(1598051730000)}]);
    const [expoPushToken, setExpoPushToken] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => console.log('add time')} title="Update count" />
            ),
        });
    }, [navigation]);
    //
    // <View>
    //     <Entypo name="plus" size={24} color="black" />
    // </View>


    console.log(navigation);


    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => {
    //         console.log(token);
    //         //setExpoPushToken(token);
    //         // sendToken(token);
    //     });
    //
    //
    //
    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //         setNotification(notification);
    //     });
    //
    //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log('listener ', response.notification);
    //         navigation.navigate("Motivation", {
    //             notification: response.notification
    //         });
    //         console.log('listen');
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
        //console.log('sending deviceId', Constants.deviceId);

        // localHost.post('/createUser', {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj1]', device_id: 'Constants.deviceId'}).then((res) => console.log(res)).catch((error) => console.log('createUser error ', error));


            // localHost.post('/create-user', {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj]', device_id: Constants.deviceId}).then((res) => console.log(res.data)).catch((error) => console.log('createUser error ', error));




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





    // if (!userInfo) {
    //     userInfo = [new userInfo(1598051730000)];
    // }


        useEffect(() => {
            Constants.deviceId = '92C2B1A7-3689-48B5-B53C-42197298D209';
            //Constants.deviceId = 'EA612344-3AA9-4150-8226-A6C6D1FF0144';
            //console.log('Constants.deviceId ', Constants.deviceId);
            localHost.get(`/get-time/${Constants.deviceId}`).then(res => {
                    const user_info = res.data.map(timeData => {
                        return timeData;
                    });

                    //const device_time = res.data[0].device_time;
                    setUserInfo(user_info);

            }).catch(error => {
                console.log('the get-device-id error ', error)

            });
        }, []);
    // }


        if (route.params) {
            //console.log('userInfo before route.params.data ', userInfo);
            userInfo.forEach((userInfoItem, index) => {
                if (userInfoItem.id === route.params.id) {
                    return userInfo[index].device_time = route.params.date;
                }
                return userInfoItem;
            });
            //userInfo = route.params.date;
            //console.log('userInfo after route.params.data ', userInfo)
        }
        else{
            //console.log('before parse ', userInfo);
            userInfo.forEach((userInfoItem, index) => {
                return userInfo[index].device_time = Date.parse(userInfoItem.device_time);
            });
            //console.log('parse ', userInfo)
        }


          let time = [];
          let period = "";
            let offset = new Date().getTimezoneOffset() * -1;

          userInfo.forEach((userInfoItem, index) => {
             //console.log('date in loop', userInfoItem);
              let tempTime = "";

              let hours = new Date(userInfoItem.device_time).getUTCHours() - (offset/60);
              console.log('offset ', offset);
              if(hours >= 12){
                  period = "AM"
              }
              else{
                  period = "PM"
              }
              tempTime = ((hours + 11) % 12 + 1).toString();
              tempTime += ":";
              if(new Date(userInfoItem.device_time).getMinutes() < 10){
                  tempTime += "0" + new Date(userInfoItem.device_time).getMinutes();
              }
              else{
                  tempTime += new Date(userInfoItem.device_time).getMinutes();
              }
              //console.log('time in loop', time);

              time.push(tempTime);
              userInfoItem.title = tempTime + ' ' + period;

              return userInfo[index] = userInfoItem;

          });

            const renderItem = ({ item }) => (
                <Item item={item} navigation={navigation}/>
              );

            const DATA = userInfo.map(timeItem => {
                return {id: timeItem.id, 'title': timeItem.title, 'deviceTime': timeItem.device_time, 'active': timeItem.active};
            });


    return (
        <View style={styles.container }>
            <View>
                <Text style={styles.header}>Motivation Time </Text>
            </View>

            <View style={styles.bodyArea}>
                <SafeAreaView style={styles.contentBox}>
                    <SwipeListView
                        style={styles.swipelist}
                        useFlatList={true}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        width={'100%'}
                        renderHiddenItem={ (rowData, rowMap) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity  style={styles.delete} onPress={ () => rowMap[rowData.item.key].closeRow() }>
                                    <AntDesign name="delete" size={24} color="white" style={styles.deleteIcon}/>
                                </TouchableOpacity>
                            </View>

                        )}
                        leftOpenValue={0}
                        rightOpenValue={-100}
                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                rowMap[rowKey].closeRow()
                            }, 2000)
                        }}
                    />
                </SafeAreaView>
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
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'flex-start'
    },
    bodyArea: {
        flex: 1,
        borderWidth: 1,
        width: '100%',
        borderColor: 'blue',
        alignItems: 'center'
    },
    contentBox: {
      marginTop: 20,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      borderWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: 'yellow',
      width: "100%",
      height: 'auto',
    },
    swipelist:{
        borderWidth: 2,
        borderColor: 'green',
        width: '100%',
        alignItems: 'center'
    },
    text:{
        color: '#fff'
    },
    rowBack:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 50,
        flexWrap: 'wrap',
    },
    delete:{
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    },
    deleteIcon:{
        marginRight:5
    }
});
