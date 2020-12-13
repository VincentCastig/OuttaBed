import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Switch, TouchableWithoutFeedback, Dimensions, TouchableHighlight} from 'react-native';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
// import { SwipeListView } from 'react-native-swipe-list-view';
import EditTime from './components/EditModal';
import {responsive, heightResponsive} from './components/Responsive';
import axios from "axios/index";
import { AppLoading } from 'expo';
import { useFonts, Font } from 'expo-font';

export default function Item( {item, navigation, updateTimes} ) {
    const [isEnabled, setIsEnabled] = useState(item.active);
    const [modalVisible, setModalVisible] = useState(false);
    const [dotsModalVisible, setDotsModalVisible] = useState(false);
    let [fontsLoaded] = useFonts({
        // 'Frank_Ruhl_Libre': require('../assets/fonts/FrankRuhlLibre-Black.ttf'),
        'Archivo': require('../assets/fonts/Archivo-Regular.ttf'),
        'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),
    });

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const setVisible = () => {
        setModalVisible(!modalVisible);
        console.log('modalVisible ', modalVisible);
    };

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        axios.put(`https://get-up-now.herokuapp.com/update-active`, {id: item.id, active: !isEnabled})
            .then(res => {
                console.log('res ', res);
            })
            .catch(error => {
                console.log('error ', error);
            });
    };

    const showEditBox = () => {
        setDotsModalVisible(!dotsModalVisible);
        console.log('modalVisible ', modalVisible);
    };
    const testButton = () => {
        console.log('test button');
    };



    if (!fontsLoaded) {
        return <AppLoading />;
    }
return (
    <View style={styles.itemContainer}>

        <TouchableHighlight style={styles.itemBox1} onPress={() => {
            setVisible();
        }}>
            <View style={styles.timeBox}>
                <Text style={styles.time}>{item.title} {item.key}</Text>
                <View style={styles.switchBox}>
                    <Switch
                        trackColor={{ false: "#000000", true: "#25ff24" }}
                        thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onChange={toggleSwitch}
                        value={isEnabled}
                        style={{ transform: [{ scaleX: responsive(.8) }, { scaleY: responsive(.8) }] }}
                    />
                </View>
            </View>
        </TouchableHighlight>

        <EditTime visible={modalVisible} showEdit={setVisible} newDate={item} updateTimes={updateTimes}></EditTime>
    </View>
);

};

const styles = StyleSheet.create({
    itemContainer:{
        marginBottom: 20,
        backgroundColor: '#292929',
        //borderColor: '#ffa04c',
        borderWidth: responsive(2),
        height: responsive(70),
        width: responsive(202),
        borderRadius: responsive(15),
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 1
    },
    itemBox1:{
        // width:'75%'
        width: '100%',
        borderRadius: responsive(15),
    },
    timeBox:{
        height: '100%',
        width: '100%',
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 20
    },
    time:{
        color: '#fff',
        // fontFamily: 'Oswald_300Light',
        //fontSize: 45,
        fontFamily: 'Archivo',
        fontSize: responsive(32),
        //borderColor: 'red',
        //borderWidth: 1,
    },
    // editContainer:{
    //   flexDirection:'row'
    // },
    // editBox:{
    //     //backgroundColor: '#4043ff',
    //     borderRadius: 4,
    //     color: '#ff6773',
    //     //borderColor: '#ffd61d',
    //     borderWidth: 1,
    //     marginTop: 10,
    //     width: 100
    // },
    // horizontalDots:{
    //     color: '#ff0006',
    //     borderWidth: 1,
    //    // borderColor: 'white',
    //     borderRadius: 10,
    //     width: 50,
    //     alignItems: 'center'
    // },
    // dotsModalBackground:{
    //     position: 'absolute',
    //     left:0,
    //     height: 400,
    //     width: 350,
    //     borderWidth: 1,
    //     borderColor: 'green',
    //     backgroundColor: '#fff',
    //     zIndex: 3333
    // },
    // dotsModal:{
    //     width: 100,
    //     borderRadius: 10,
    //     position: 'absolute',
    //     bottom: -45,
    //     right: 25,
    //     borderColor: '#fff',
    //     borderWidth: 1,
    //     backgroundColor:'#fff',
    //     zIndex: 3
    // },
    dotsModalText:{
        color: '#616161',
        padding: 10,
        borderBottomColor: '#9b9b9b',
        borderBottomWidth: 1
    },
    dotsModalCancel:{
        color: '#616161',
        padding: responsive(10),
    },
    switchBox:{
        // flexDirection: 'column',
        // alignItems: 'flex-end',
        // marginRight: 5
        width: responsive(40),
        // backgroundColor: '#fff'
    }
});
