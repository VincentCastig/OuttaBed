import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

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

  console.log('edit date ', date)

  axios.post(`http://localhost:3000/create-user`, {deviceId: 2}).then(res => console.log(res));

  if(typeof newDate == "number") {
    date = new Date(newDate);
    route.params = "";
    console.log('new date ', date)
  }

  console.log("newDate ", newDate);
  console.log("date ", date);


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