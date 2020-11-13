import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Switch, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function Item( {item, navigation} ) {
const [isEnabled, setIsEnabled] = useState(item.active);

const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
};


    // Buttons
    let swipeoutBtns = [
        {
            text: 'Button'
        }
    ];
    //right={swipeoutBtns}


return (
    <View style={styles.item}>
        <TouchableHighlight onPress={() => navigation.navigate("Edit", {
            newDate: item
        })}>
            <View style={styles.timeBox}>
                <Text style={styles.time}>{item.title} {item.key}</Text>
                <View style={styles.switchBox}>
                    <Switch
                        trackColor={{ false: "#000000", true: "#25ff24" }}
                        thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <TouchableHighlight
                        onpress={() => console.log('options')}
                    >
                        <Entypo name="dots-three-horizontal" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>
        </TouchableHighlight>
        {/*<View style={styles.editContainer}>*/}
            {/*<View style={styles.editBox}>*/}
                {/*<Button*/}
                    {/*title="Edit Time"*/}
                    {/*onPress={() => navigation.navigate("Edit", {*/}
                        {/*newDate: item*/}
                    {/*})}*/}
                {/*/>*/}
            {/*</View>*/}
        {/*</View>*/}
    </View>
);

};

const styles = StyleSheet.create({
    timeBox:{
        height: 100,
        width: 295,
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: '#fff',
        borderColor: '#3e4948',
        borderWidth: 2,
        borderRadius: 20
        //borderTopWidth: 2,
        //borderBottomWidth:2
    },
    time:{
        color: '#fff',
        fontSize: 45
    },
    // editContainer:{
    //   flexDirection:'row'
    // },
    editBox:{
        //backgroundColor: '#4043ff',
        borderRadius: 4,
        color: '#ff6773',
        borderColor: '#ffd61d',
        borderWidth: 1,
        marginTop: 10,
        width: 100
    },
    editButton:{
        color: '#ff0006'
    },
    item:{
        marginBottom: 20,
        backgroundColor: '#000'
    },
    switchBox:{
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 5
    }
});
