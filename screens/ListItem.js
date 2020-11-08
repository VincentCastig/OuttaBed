import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Switch} from 'react-native';
import Swipeout from 'react-native-swipeout';


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


return (
    <Swipeout right={swipeoutBtns} style={styles.item}>
        <View style={styles.timeBox}>
            <Text style={styles.time}>{item.title} {item.key}</Text>
            <Switch
                trackColor={{ false: "#000000", true: "#25ff24" }}
                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
        <View style={styles.editBox}>
            <Button
                title="Edit Time"
                onPress={() => navigation.navigate("Edit", {
                    newDate: item
                })}
            />
        </View>
    </Swipeout>
);

};

const styles = StyleSheet.create({
    timeBox:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: '#fff',
        borderTopWidth: 2,
        borderBottomWidth:2
    },
    time:{
        color: '#fff',
        fontSize: 65
    },
    editBox:{
        //backgroundColor: '#4043ff',
        borderRadius: 4,
        color: '#ff6773',
        borderColor: '#ffd61d',
        borderWidth: 1,
    },
    editButton:{
        color: '#ff0006'
    },
    item:{
        marginBottom: 20,
        backgroundColor: '#000'
    }
});
