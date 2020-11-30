
import React, {Component, useState, ListView, useEffect, useRef} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    View,
    Image,
    FlatList,
    Button,
    Switch,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
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
import {responsive, heightResponsive} from './components/Responsive';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




export default function HomeScreen({route, navigation}) {
    const [userInfo, setUserInfo] = useState([]);
    const [expoPushToken, setExpoPushToken] = useState(null);
    // const [dotsModalVisible, setDotsModalVisible] = useState(true);
    //const [dimensions, setDimensions] = useState({ window, screen });
    const notificationListener = useRef();
    const responseListener = useRef();

    const addIt = (data) => {
        setUserInfo(userInfo => [...userInfo, data]);
    };

    const addTime = () => {
        console.log('adding time ', Constants.deviceId);
        //expoPushToken.data ||
        axios.post(`https://get-up-now.herokuapp.com/create-user`, {token: 'ExponentPushToken[Rd-iGMMu_P-ME7ueeFmPWE]', device_id: Constants.deviceId})
            .then((res) => {
                console.log('res ', res.data[0]);
                addIt(res.data[0]);
                console.log(userInfo);
            })
            .catch((error) => console.log('createUser error ', error));
    };

    const deleteTime = (time) => {
        axios.delete(`https://get-up-now.herokuapp.com/delete-time/${time.id}`)
            .then(res => {
                setUserInfo(userInfo.filter((item) => item.id !== time.id));
                console.log('deleteTime res ', res);
            })
            .catch(error => {
                console.log('deleteTime error', error)
            })
    };




    //
    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => {
    //         console.log('registerForPushNotificationsAsync token ', token);
    //         setExpoPushToken(token);
    //         //sendToken(token);
    //         console.log('sent')
    //     });
    //
    //
    //
    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //     //     setNotification(notification);
    //     // });
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




        useEffect(() => {
            axios.get(`https://get-up-now.herokuapp.com/get-time/${Constants.deviceId}`).then(res => {
                    const user_info = res.data.map(timeData => {
                        return timeData;
                    });

                    setUserInfo(user_info);

            }).catch(error => {
                console.log('the get-device-id error ', error)
            });
        }, []);


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
            <View style={styles.loadingWrapper}>
                <View style={styles.titleContainer}>
                    <View style={styles.addTimeBox}></View>
                    <Text style={styles.title}>OutABed</Text>
                    <TouchableWithoutFeedback
                        onPress={() => addTime()}
                    >
                        <View style={styles.addTimeBox}>
                            <Entypo name="plus" size={responsive(24)} color="#fff" />
                        </View>

                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.loadingBody}>
                    <View style={styles.noDataBox}>
                        <TouchableOpacity
                            onPress={() => addTime()}
                        >
                            {/*<View style={styles.addButton}>*/}
                                {/*<Entypo name="plus" size={36} color="#000" />*/}
                            {/*</View>*/}
                            <Image
                                // style={styles.tinyLogo}
                                source={require('../assets/LoadingIcon.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.noDataText}>Add notification</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container }>
            {/*<ImageBackground source={require('../assets/background.jpg')} style={styles.image}>*/}
            <ImageBackground source={require('../assets/pexels-patryk-kamenczak-775219.jpg')} style={styles.image}>

            <View style={styles.titleContainer}>

                <View style={styles.addTimeBox}></View>

                <Text style={styles.header}>Motivation Time </Text>

                <TouchableOpacity
                    onPress={() => addTime()}
                >
                    <View style={styles.addTimeBox}>
                        <Entypo name="plus" size={responsive(23)} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
            {/*<View>*/}
                {/*<Text style={styles.header}>Motivation Time </Text>*/}
            {/*</View>*/}

            <View style={styles.bodyArea}>
                <SafeAreaView style={styles.contentBox}>
                    <SwipeListView
                        contentContainerStyle={styles.swipelist}
                        useFlatList={true}
                        data={userInfo}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        width={'100%'}
                        renderHiddenItem={ (rowData, rowMap) => (
                            <View style={styles.rowBack}>
                                <View style={styles.deleteBox}>
                                    <TouchableOpacity  style={styles.deleteRedButton} onPress={() => deleteTime(rowData.item)} >
                                        <AntDesign name="delete" size={responsive(18)} color="white" style={styles.deleteIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        )}
                        leftOpenValue={0}
                        rightOpenValue={responsive(-90)}
                        // onRowOpen={(rowKey, rowMap) => {
                        //     setTimeout(() => {
                        //         rowMap[rowKey].closeRow()
                        //     }, 4000)
                        // }}
                    />
                </SafeAreaView>
                {/*{dotsModalVisible ? (*/}
                    {/*<View style={styles.dotsModalBackground}>*/}
                    {/*</View>*/}
                {/*): null}*/}
            </View>
            </ImageBackground>

        </View>
    );

}


const styles = StyleSheet.create({
    loadingWrapper:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    loadingBody: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    noDataBox:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton:{
        width:40,
        height: 40,
        marginBottom: 5,
        backgroundColor: '#ffad1c',
        borderRadius:20,
        //borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noDataText:{
        color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
        // borderColor: 'red',
        // borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        // flex: 1,
        // resizeMode: "cover",
        alignItems: 'center',
        // justifyContent: "center"
    },
    titleContainer:{
        //height: 100,
        height: responsive(77),
        width: windowWidth,
        paddingTop: 20,
        backgroundColor: '#292929',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    titleBoxWidth:{
        width: responsive(30)
    },
    title:{
        color: '#fff',
        fontSize: responsive(12),
    },
    // tinyLogo:{
    //     width: 50,
    //     height: 50,
    //     borderRadius: 30
    // },
    addTimeBox:{
        // position: 'absolute',
        // // backgroundColor: '#ff503a',
        // right: 15,
        // top: 45,
        // top: responsive(35),
        //borderWidth:3,
        width: responsive(35),
        alignItems: 'center'
    },
    header: {
        color: '#fff',
        // fontSize: 30,
        fontSize: responsive(23),
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'flex-start'
    },
    bodyArea: {
        flex: 1,
        borderWidth: 1,
        width: '100%',
        borderColor: 'blue',
        alignItems: 'center',
    },
    contentBox: {
      //marginTop: 20,
        //paddingTop: 20,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      borderWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      // borderColor: 'yellow',
      width: windowWidth,
        // width: 333,
      height: '100%',
        zIndex: 2
    },
    swipelist:{
        //borderWidth: 3,
        alignItems: 'center',
        marginTop: 20,
    },

    text:{
        color: '#fff'
    },
    rowBack:{
        height: responsive(75),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        zIndex: -1,
        // backgroundColor:'#ffa186',
    },
    deleteBox:{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //flex: 2,
        width: responsive(50)
    },
    deleteRedButton:{
        width: responsive(39),
        height: responsive(39),
        borderRadius: responsive(8),
        backgroundColor:'#ff0010',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    },
    deleteIcon:{
        // backgroundColor: '#000',
        // marginRight:5
    },
    // dotsModalBackground:{
    //     width: 50,
    //     height: 550,
    //     borderWidth: 2,
    //     borderColor: 'green',
    //     position:'absolute',
    //     top: 0,
    //     zIndex: 2
    // }
});
