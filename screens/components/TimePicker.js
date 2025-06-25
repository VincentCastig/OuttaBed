import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditScreen({ route, navigation }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const { newDate } = route.params;

  const onChange = (event, selectedDate) => {
    // For Android, dismiss the picker after selection
    if (Platform.OS !== 'ios') {
      setShow(false);
    }
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
        {/* If you want to show date picker button, you can uncomment below */}
        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
