import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import TimePicker from '../components/TimePicker';



//import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
    return (
        <View>
            <Text>Here is the home page</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff000f',
        height: 22,
        width: 22,
    }
});
