import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, FlatList, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import TimePicker from '../components/TimePicker';




export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
       
      }
    render() {
        console.log(this.props.navigation);
        const Item = ({ title }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{title}</Text>
            </View>
          );
        
          const { date } = this.props.route.params || "ok";
            const renderItem = ({ item }) => (
                <Item title={item.title} />
              );

              const DATA = [
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  title: date,
                },
                {
                  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                  title: 'Second Item',
                },
                {
                  id: '58694a0f-3da1-471f-bd96-145571e29d72',
                  title: 'Third Item',
                }
              ];

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Text style={styles.header}>Alarm </Text>
            </View>

            <SafeAreaView>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onPress={() => this.props.navigation.navigate("Edit")}
            />
             <Button
                title="Go to Edit Page"
                onPress={() => this.props.navigation.navigate("Edit")}
            />
            </SafeAreaView>
        
            <Button
                title="Go to Edit Page"
                onPress={() => this.props.navigation.navigate("Edit")}
            />
        </View>
    );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff000f',
        height: 22,
        width: 22,
    },
    header: {
        fontSize: 30
    }
});
