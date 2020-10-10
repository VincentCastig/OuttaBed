import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Constants from 'expo-constants';

export default function EditScreen({route, navigation}) {
  let [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

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

  let { newDate } = route.params;

  axios.put(`http://localhost:3000/add-time`, {device_time: date, device_id: Constants.deviceId}).then(res => console.log(res)).catch(error => console.log(error));

  if(typeof newDate == "number") {
    date = new Date(newDate);
    route.params = "";
    console.log('new date ', date)
  }

  // console.log("newDate ", newDate);
  // console.log("date ", date);


  return (
    <View>
      <View>
      <Button
                style={{fontSize: 20, color: 'green'}}
                styleDisabled={{color: 'red'}}
                title="Save"
                onPress={() => navigation.navigate("Home", { date: Date.parse(date)})}
        />
      </View>
      {/* {show && ( */}
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
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
