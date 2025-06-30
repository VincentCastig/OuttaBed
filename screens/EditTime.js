import React, { useEffect, useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Constants from 'expo-constants';

export default function EditScreen({ route, navigation }) {
  // Initialize date state with route param or fallback
  const initialDate = route.params?.newDate?.deviceTime
    ? new Date(route.params.newDate.deviceTime)
    : new Date();

  const [date, setDate] = useState(initialDate);
  const [userInfo, setUserInfo] = useState(route.params?.newDate || null);
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(Platform.OS === 'ios'); // show picker by default on iOS

  // Timezone offset in minutes (negative of getTimezoneOffset)
  const offset = new Date().getTimezoneOffset() * -1;

  // Update date and userInfo if route params change
  useEffect(() => {
    if (route.params?.newDate) {
      setUserInfo(route.params.newDate);
      setDate(new Date(route.params.newDate.deviceTime));
      // Optionally clear params after using them to avoid repeated updates
      // navigation.setParams({ newDate: null });
    }
  }, [route.params?.newDate]);

  // Sync date update to backend when date or userInfo changes
  useEffect(() => {
    if (userInfo) {
      axios
        .put(`https://get-up-now.herokuapp.com/add-time`, {
          id: userInfo.id,
          device_time: date,
          device_id: Constants.deviceId,
        })
        .then((res) => console.log('Saved time:', res.data))
        .catch((error) => console.error('Error saving time:', error));
    }
  }, [date, userInfo]);

  // DateTimePicker onChange handler
  const onChange = (event, selectedDate) => {
    // On Android, user can cancel picking => selectedDate may be undefined
    if (selectedDate) {
      setDate(selectedDate);
    }
    // On Android, hide picker after selection
    if (Platform.OS !== 'ios') {
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View style={{ marginBottom: 12 }}>
        <Button
          title="Save"
          onPress={() =>
            navigation.navigate('Home', { date: date.getTime(), id: userInfo?.id })
          }
        />
      </View>

      {/* Show picker only when 'show' is true */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          timeZoneOffsetInMinutes={offset}
          onChange={onChange}
        />
      )}

      {/* Optional buttons to toggle picker modes */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <Button title="Show Date Picker" onPress={() => showMode('date')} />
        <Button title="Show Time Picker" onPress={() => showMode('time')} />
      </View>
    </View>
  );
}
