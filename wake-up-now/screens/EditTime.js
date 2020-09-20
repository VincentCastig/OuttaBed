import React, {useState, Component} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const [date, setDate] = useState(new Date(1598051730000));
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

export default class EditScreen extends Component {

render(){
  return (
    <View>
      <View>
        <Button
                style={{fontSize: 20, color: 'green'}}
                styleDisabled={{color: 'red'}}
                title="Press Me"
                onPress={() => navigation.navigate("Home", { date: 86})}
        />
            
        <Button onPress={showTimepicker} title="Show time picker!" />
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
      }
};