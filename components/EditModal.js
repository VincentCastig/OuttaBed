import React, { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Constants from 'expo-constants';

import {
    Alert,
    Modal, Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Button
} from "react-native";

export default function EditTime({visible, onClick, newDate}) {
    let [date, setDate] = useState(new Date(1598051730000));
    let [userInfo, setUserInfo] = useState(newDate);
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [routeParams, setRouteParams] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log('changing date to ', date)
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
            setUserInfo(newDate);
            date = new Date(userInfo.deviceTime);
            setRouteParams(false);
            console.log('date from params ', date)
    });

    if (routeParams) {
        date = new Date(newDate.deviceTime);
    }

    let offset = new Date().getTimezoneOffset() * -1;


    if (userInfo) {
        console.log('userInfo ', userInfo);
        axios.put(`https://get-up-now.herokuapp.com/add-time`, {id: userInfo.id, device_time: date, device_id: Constants.deviceId}).then(res => console.log(res.data)).catch(error => console.log(error));
    }


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{borderColor: "#2196F3"}}>
                            <Button
                                style={{fontSize: 20, color: 'green'}}
                                styleDisabled={{color: 'red'}}
                                title="Save"
                                //fix this
                                onPress={() => navigation.navigate("Home", { date: Date.parse(date), id: userInfo.id})}
                            />
                        </View>
                        {/* {show && ( */}
                        <View style={{ height: 200, width: 200}}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={offset}
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                        </View>
                        <Text style={styles.modalText}>Hello World!</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={onClick}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: 250,
        height: 400,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
