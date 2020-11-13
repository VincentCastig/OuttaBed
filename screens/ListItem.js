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
    <View style={styles.itemContainer}>
        <TouchableHighlight style={styles.itemBox1} onPress={() => navigation.navigate("Edit", {
            newDate: item
        })}>
            <View style={styles.timeBox}>
                <Text style={styles.time}>{item.title} {item.key}</Text>
                <View style={styles.switchBox}>
                </View>
            </View>
        </TouchableHighlight>

        <View style={styles.itemBox2}>
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
);

};

const styles = StyleSheet.create({
    itemContainer:{
        marginBottom: 20,
        backgroundColor: '#000',
        borderColor: '#ffa04c',
        borderWidth: 2,
        marginLeft: 30,
        height: 100,
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemBox1:{
        width:'75%'
    },
    itemBox2:{
        width:'25%',
        height: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    timeBox:{
        height: '100%',
        width: '100%',
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: '#fff',
        // borderColor: '#3e4948',
        borderWidth: 4,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
        //borderTopWidth: 2,
        //borderBottomWidth:2
    },
    time:{
        color: '#fff',
        fontSize: 45,
        borderColor: 'red',
        borderWidth: 1,

    },
    // editContainer:{
    //   flexDirection:'row'
    // },
    editBox:{
        //backgroundColor: '#4043ff',
        borderRadius: 4,
        color: '#ff6773',
        borderColor: '#ffd61d',
        borderWidth: 3,
        marginTop: 10,
        width: 100
    },
    editButton:{
        color: '#ff0006'
    },
    switchBox:{
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 5
    }
});
