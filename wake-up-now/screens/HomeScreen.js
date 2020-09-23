import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, FlatList, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import TimePicker from '../components/TimePicker';




export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all: props.route.params,
        }
       
      }
      
    render() {
        console.log("props ", this.props.route.params);
        
          let { date } = this.props.route.params || "ok";
          let time = "";
          let period = "";
          
          if(typeof date == "number"){
            let hours = new Date(date).getUTCHours();
            if(hours >= 12){
              period = "PM"
            }
            else{
              period = "AM"
            }
            time = ((hours + 11) % 12 + 1).toString();
            time += ":";
            if(new Date(date).getUTCMinutes() < 10){
              time += "0" + new Date(date).getUTCMinutes();
            }
            else{
              time += new Date(date).getUTCMinutes();
            }
          }

          const Item = ({ title }) => (
            <View style={styles.itemBox}>
              <Text style={styles.time}>{title} {period}</Text>
              <Button
                title="Edit Time"
                onPress={() => this.props.navigation.navigate("Edit", {
                    newDate: date
                })}
                />
            </View>
          );
            const renderItem = ({ item }) => (
                <Item title={item.title} />
              );

              const DATA = [
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  title: time,
                },
                // {
                //   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                //   title: 'Second Item',
                // },
              ];

    return (
        <View style={styles.container }>
            <View>
                <Text style={styles.header}>Motivation Time </Text>
            </View>

            <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onPress={() => this.props.navigation.navigate("Edit")}
            />
          
            </SafeAreaView>
        
        
        </View>
    );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 2,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
        marginTop: 10
    },
    itemBox: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      borderWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      width: "100%",
      height: 63
    },
    safeArea: {
      flex: 1
    },
    time:{
      fontSize: 34
    }
});
