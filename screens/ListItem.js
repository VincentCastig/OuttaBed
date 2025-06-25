import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import EditTime from './components/EditModal';
import { responsive } from './components/Responsive';
import axios from 'axios';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function Item({ item, navigation, updateTimes, deleteItem }) {
  const [isEnabled, setIsEnabled] = useState(item.active);
  const [modalVisible, setModalVisible] = useState(false);
  const [dotsModalVisible, setDotsModalVisible] = useState(false);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Archivo: require('../assets/fonts/Archivo-Regular.ttf'),
    DancingScript: require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const setVisible = () => {
    setDotsModalVisible(false);
    setModalVisible(!modalVisible);
  };

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    axios
      .put(`https://get-up-now.herokuapp.com/update-active`, {
        id: item.id,
        active: newValue,
      })
      .then((res) => {
        console.log('res ', res.data);
        if (updateTimes) updateTimes(); // optionally update times after toggling
      })
      .catch((error) => {
        console.error('error ', error);
      });
  };

  const showEditBox = () => {
    setDotsModalVisible(!dotsModalVisible);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableHighlight style={styles.itemBox1} onPress={setVisible}>
        <View style={styles.timeBox}>
          <Text style={styles.time}>
            {item.title} {item.key}
          </Text>
          <View style={styles.switchBox}>
            <Switch
              trackColor={{ false: '#000000', true: '#25ff24' }}
              thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onChange={toggleSwitch}
              value={isEnabled}
              style={{
                transform: [{ scaleX: responsive(0.7) }, { scaleY: responsive(0.7) }],
              }}
            />
          </View>
        </View>
      </TouchableHighlight>

      <EditTime
        visible={modalVisible}
        showEdit={setVisible}
        newDate={item}
        updateTimes={updateTimes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#292929',
    borderWidth: responsive(2),
    height: responsive(70),
    width: responsive(209),
    borderRadius: responsive(15),
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
  },
  itemBox1: {
    width: '100%',
    borderRadius: responsive(15),
  },
  timeBox: {
    height: '100%',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 20,
  },
  time: {
    color: '#fff',
    fontFamily: 'Archivo',
    fontSize: responsive(32),
  },
  switchBox: {
    width: responsive(42),
    flexDirection: 'column',
  },
});
