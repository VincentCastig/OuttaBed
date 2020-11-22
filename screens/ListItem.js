import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Switch, TouchableWithoutFeedback, Dimensions, TouchableHighlight} from 'react-native';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
// import { SwipeListView } from 'react-native-swipe-list-view';
import EditTime from './components/EditModal';
import axios from "axios/index";

export default function Item( {item, navigation, updateTimes} ) {
    const [isEnabled, setIsEnabled] = useState(item.active);
    const [modalVisible, setModalVisible] = useState(false);
    const [dotsModalVisible, setDotsModalVisible] = useState(false);

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
        console.log('showing');
        setDotsModalVisible(!dotsModalVisible);
        console.log('modalVisible ', modalVisible);
    };
    const testButton = () => {
        console.log('test button');
    };



return (
    <View style={styles.itemContainer}>

        <TouchableHighlight style={styles.itemBox1} onPress={() => {
            showEditBox();
        }}>
            <View style={styles.timeBox}>
                <Text style={styles.time}>{item.title} {item.key}</Text>
                <View style={styles.switchBox}>
                </View>
            </View>
        </TouchableHighlight>

        <View style={styles.itemBox2}>
            <Switch
                trackColor={{ false: "#000000", true: "#25ff24" }}
                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onChange={toggleSwitch}
                value={isEnabled}
            />

            <View style={{zIndex: 3}}>
                <TouchableHighlight  onPress={() => {
                    showEditBox();
                }}>
                    <View style={styles.horizontalDots}>
                        <Entypo name="dots-three-horizontal" size={24} color="white" />
                    </View>
                </TouchableHighlight>

                {dotsModalVisible ? (
                    <TouchableHighlight  onPress={() => {
                        testButton();
                    }}>
                        <View style={styles.dotsModal}>
                            <View style={styles.dotsModalText}>
                                <Text>Edit</Text>
                            </View>
                            <View style={styles.dotsModalText}>
                                <Text>Delete</Text>
                            </View>
                            <View style={styles.dotsModalCancel}>
                                <Text>Cancel</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                ): null
                }
            </View>

        </View>



        {/*<EditTime visible={modalVisible} showEdit={setVisible} newDate={item} updateTimes={updateTimes}></EditTime>*/}
    </View>
);

};

const styles = StyleSheet.create({
    itemContainer:{
        marginBottom: 20,
        backgroundColor: '#000',
        borderColor: '#ffa04c',
        borderWidth: 2,
        marginLeft: 30,
        height: 100,
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 1
    },
    itemBox1:{
        width:'75%'
    },
    itemBox2:{
        width:'25%',
        height: '100%',
        paddingTop: 13,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative'
    },
    timeBox:{
        height: '100%',
        width: '100%',
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: '#fff',
        // borderColor: '#3e4948',
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
        //borderTopWidth: 2,
        //borderBottomWidth:2
    },
    time:{
        color: '#fff',
        fontSize: 45,
        borderColor: 'red',
        borderWidth: 1,

    },
    // editContainer:{
    //   flexDirection:'row'
    // },
    editBox:{
        //backgroundColor: '#4043ff',
        borderRadius: 4,
        color: '#ff6773',
        borderColor: '#ffd61d',
        borderWidth: 1,
        marginTop: 10,
        width: 100
    },
    horizontalDots:{
        color: '#ff0006',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        width: 50,
        alignItems: 'center'
    },
    dotsModalBackground:{
        position: 'absolute',
        left:0,
        height: 400,
        width: 350,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: '#fff',
        zIndex: 3333
    },
    dotsModal:{
        width: 100,
        borderRadius: 10,
        position: 'absolute',
        bottom: -45,
        right: 25,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor:'#fff',
        zIndex: 3
    },
    dotsModalText:{
        color: '#616161',
        padding: 10,
        borderBottomColor: '#9b9b9b',
        borderBottomWidth: 1
    },
    dotsModalCancel:{
        color: '#616161',
        padding: 10,
    },
    switchBox:{
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 5
    }
});
