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
import {responsive, heightResponsive} from "./Responsive";

export default function EditTime({visible, showEdit, newDate, updateTimes}) {
    let [userInfo, setUserInfo] = useState(newDate);
    let [date, setDate] = useState(new Date (newDate.device_time));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [routeParams, setRouteParams] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
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

    const saveTime = ({date, id}) => {
        showEdit();
        updateTimes(date, id);
        let myDate = new Date(date);
        axios.put(`https://get-up-now.herokuapp.com/add-time`, {id: id, device_time: myDate, device_id: Constants.deviceId}).then(res => console.log('res.data ', res.data)).catch(error => console.log(error));
    };

    // useEffect(() => {
    //         setUserInfo(newDate);
    //         date = new Date(userInfo.deviceTime);
    //         setRouteParams(false);
    //         console.log('date in useEffect ', date)
    // });
    //
    // if (routeParams) {
    //     date = new Date(newDate.deviceTime);
    // }

    let offset = new Date().getTimezoneOffset() * -1;


    // if (userInfo) {
    //     console.log('userInfo deviceTime before request', userInfo.deviceTime);
    //     console.log('visible ', visible);
    //     console.log('newDate ', newDate);
    //     axios.put(`https://get-up-now.herokuapp.com/add-time`, {id: userInfo.id, device_time: date, device_id: Constants.deviceId}).then(res => console.log('res.data ', res.data)).catch(error => console.log(error));
    // }

    return (
        <View>
            <Modal
                // animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* {show && ( */}
                        <View style={styles.pickerBox}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={offset}
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={onChange}
                                style={styles.datePicker}
                            />
                        </View>

                        <View style={styles.buttonBox}>
                            <TouchableHighlight
                                style={{ ...styles.cancelButton }}
                                onPress={showEdit}
                                underlayColor="#fff"
                            >
                                <Text style={styles.textCancel}>Cancel</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={{ ...styles.saveButton}}
                                underlayColor="#fff"
                                onPress={() => saveTime({ date: Date.parse(date), id: userInfo.id})}
                            >
                                <Text style={styles.textSave}>Save</Text>
                            </TouchableHighlight>
                        </View>

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
        marginTop: responsive(18),
        //backgroundColor: '#fff'
    },
    modalView: {
        //width: 250,
        // height: responsive(250),
        //backgroundColor: '#000',
        width: responsive(193),
        height: responsive(220),
        //margin: responsive(16),
        backgroundColor: "white",
        borderRadius: responsive(16),
        //padding: 35,
        // padding: responsive(27),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        ///backgroundColor: '#000'
    },
    pickerBox:{
        margin: responsive(5),
        //\padding: responsive(27),
        // height: 200,
        height: '100%',
        // width: 200,
        width: responsive(152)
    },
    datePicker:{
        //fontSize: 33
        backgroundColor: "white",
        height: '90%',
        width: '100%'
    },
    buttonBox:{
        backgroundColor: '#9b9b9b',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottomLeftRadius: responsive(16),
        borderBottomRightRadius: responsive(16),
        position: 'absolute',
        bottom: 0
        //marginTop: responsive(9),
        //height: heightResponsive(12),
    },
    cancelButton: {
        //backgroundColor: "#c2cdf3",
        // borderRadius: 20,
        backgroundColor: "#fff",
        width: '50%',
        padding: responsive(8),
        borderBottomLeftRadius: responsive(16)
        //elevation: 2
    },
    saveButton:{
        backgroundColor: "#fff",
        width: '50%',
        borderColor: "#2196F3",
        // borderRadius: 20,
        padding: responsive(8),
        borderBottomRightRadius: responsive(16)
        //elevation: 2
    },
    textCancel: {
        color: "#dddddd",
        fontWeight: "bold",
        textAlign: "center"
    },
    textSave: {
        color: "#1393ff",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
