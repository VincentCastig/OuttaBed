
import React, {Component, useState, ListView, useEffect, useRef} from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, FlatList, Button, Switch, TouchableWithoutFeedback } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
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
    const [userInfo, setUserInfo] = useState([]);
    const [expoPushToken, setExpoPushToken] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    const addIt = (data) => {
        setUserInfo(userInfo => [...userInfo, data]);
    };

    const addTime = () => {
        console.log('adding time ', Constants.deviceId);
        axios.post(`https://get-up-now.herokuapp.com/create-user`, {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj1]', device_id: Constants.deviceId})
            .then((res) => {
                console.log('res ', res.data[0]);
                addIt(res.data[0]);
                console.log(userInfo);
            })
            .catch((error) => console.log('createUser error ', error));
    };

    const deleteTime = (time) => {
        console.log('deleting ', time.id);
        axios.delete(`https://get-up-now.herokuapp.com/delete-time`, {id: time.id})
            .then(res => {
                console.log('deleteTime res ', res)
            })
            .catch(error => {
                console.log('deleteTime error', error)
            })
    };


    //
    // <View>
    //     <Entypo name="plus" size={24} color="black" />
    // </View>




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

        // localHost.post('/create-user', {token: 'ExponentPushToken[qHhmjtM21eqgpgMASDMnpj1]', device_id: 'Constants.deviceId'}).then((res) => console.log(res)).catch((error) => console.log('createUser error ', error));


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

        const updateTimes = (date, id) => {
            console.log('updating the times ', date, id);

            userInfo.forEach((userInfoItem, index) => {
                if (userInfoItem.id === id) {
                    console.log('userInfoItem id', userInfoItem.id);
                    return userInfo[index].device_time = date;
                }
                return userInfoItem;
            });

            setUserInfo([]);
            setUserInfo(userInfo);
            //updateTitle(user_info);

        };

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
            console.log('before parse ', userInfo.id);
            userInfo.forEach((userInfoItem, index) => {
                if (typeof userInfoItem.device_time == 'number') {
                    return;
                }
                return userInfo[index].device_time = Date.parse(userInfoItem.device_time);
            });
            //console.log('parse ', userInfo)
        }

        console.log('here we go');


          let time = [];
          let period = "";
          let offset = new Date().getTimezoneOffset() * -1;

          console.log('offset ', offset);


          userInfo.forEach((userInfoItem, index) => {
             console.log('index in loop', index);
              let tempTime = "";
              let hours = '';

              if (offset < 0) {
                  hours = new Date(userInfoItem.device_time).getUTCHours() + (offset/60);
              }
              else{
                  hours = new Date(userInfoItem.device_time).getUTCHours() - (offset/60);
              }
              //let hours = new Date(userInfoItem.device_time).getUTCHours() - (offset/60);

              console.log('hours ', hours);

              if(hours >= 12){
                  period = "PM"
              }
              else{
                  period = "AM"
              }

              tempTime = ((hours + 11) % 12 + 1).toString();
              tempTime += ":";
              if(new Date(userInfoItem.device_time).getMinutes() < 10){
                  tempTime += "0" + new Date(userInfoItem.device_time).getMinutes();
              }
              else{
                  tempTime += new Date(userInfoItem.device_time).getMinutes();
              }

              time.push(tempTime);
              userInfoItem.title = tempTime + ' ' + period;

              return userInfo[index] = userInfoItem;
          });
            //updateTitle('time');

            const renderItem = ({ item }) => (
                <Item item={item} updateTimes={updateTimes}/>
              );


    if(userInfo.length === 0){
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container }>
            <View style={styles.titleContainer}>

                <Text style={styles.title}>OutABed</Text>


                <TouchableWithoutFeedback
                    onPress={() => addTime()}
                >
                    <View style={styles.addTimeBox}>
                        <Entypo name="plus" size={24} color="#FFE702" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View>
                <Text style={styles.header}>Motivation Time </Text>
            </View>

            <View style={styles.bodyArea}>
                <SafeAreaView style={styles.contentBox}>
                    <SwipeListView
                        // style={styles.swipelist}
                        useFlatList={true}
                        data={userInfo}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        width={'100%'}
                        renderHiddenItem={ (rowData, rowMap) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity  style={styles.delete} onPress={ () => rowMap[rowData.item.key].closeRow() }>
                                    <AntDesign name="delete" size={24} color="white" style={styles.deleteIcon} onPress={() => deleteTime(rowData.item)}/>
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
    titleContainer:{
        height: 100,
        width: '100%',
        paddingTop: 20,
        backgroundColor: '#292929',
        // justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    title:{
        color: '#fff',
        // position: 'absolute',
        // right: '40%',
    },
    addTimeBox:{
        position: 'absolute',
        right: 10
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
        // alignItems: 'center'
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
