import React, {useEffect, useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Constants from 'expo-constants';
import localHost from '../src/api/localHost';

export default function EditScreen({route, navigation}) {
  let [date, setDate] = useState(new Date(1598051730000));
  let [userInfo, setUserInfo] = useState(route.params.newDate);
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

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
        if (route.params) {
            setUserInfo(route.params.newDate);
            date = new Date(userInfo.deviceTime);
            route.params = "";
            console.log('date from params ', date)
        }
    });
    if (route.params) {
        date = new Date(route.params.newDate.deviceTime);
    }


    // if(userInfo && typeof userInfo.deviceTime == "number") {
    //
    //     date = new Date(userInfo.deviceTime);
    //     route.params = "";
    // }
    // else{
    // }
    let offset = new Date().getTimezoneOffset() * -1;


    if (userInfo) {
        console.log('userInfo ', userInfo);
        axios.put(`https://get-up-now.herokuapp.com/add-time`, {id: userInfo.id, device_time: date, device_id: Constants.deviceId}).then(res => console.log(res.data)).catch(error => console.log(error));
    }

  return (
    <View>
      <View>
      <Button
                style={{fontSize: 20, color: 'green'}}
                styleDisabled={{color: 'red'}}
                title="Save"
                onPress={() => navigation.navigate("Home", { date: Date.parse(date), id: userInfo.id})}
        />
      </View>
      {/* {show && ( */}
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={offset}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      {/* )} */}
    </View>
  );
};
