import React, {useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Switch,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    Alert,
    Image
} from 'react-native';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
// import { SwipeListView } from 'react-native-swipe-list-view';
import EditTime from './components/EditModal';
import {responsive, heightResponsive} from './components/Responsive';
import axios from "axios/index";
import AppLoading from 'expo-app-loading';
import { useFonts, Font } from 'expo-font';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

export default function Item( {item, navigation, updateTimes, deleteItem} ) {
    const [isEnabled, setIsEnabled] = useState(item.active);
    const [modalVisible, setModalVisible] = useState(false);
    const [dotsModalVisible, setDotsModalVisible] = useState(false);
    let [yPosition, setYPosition] = useState(0);
    let [fontsLoaded] = useFonts({
        // 'Frank_Ruhl_Libre': require('../assets/fonts/FrankRuhlLibre-Black.ttf'),
        'Archivo': require('../assets/fonts/Archivo-Regular.ttf'),
        'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),
    });

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const setVisible = () => {
        setDotsModalVisible(false);
        setModalVisible(!modalVisible);
    };

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        axios.put(`https://get-up-now.herokuapp.com/update-active`, {id: item.id, active: !isEnabled})
            .then(res => {
                console.log('res ', res);
            })
            .catch(error => {
                console.log('error ', error);
            });
    };

    const showEditBox = () => {
        setDotsModalVisible(!dotsModalVisible);
    };



    if (!fontsLoaded) {
        return <AppLoading />;
    }
return (
    <View>
        <SwipeRow
            rightOpenValue={-120}
            stopRightSwipe={-120}
            forceCloseToRightThreshold={100}
            // style={{width: '#73ff79'}}
            disableRightSwipe>
            <View style={styles.hiddenRow}>
                <View style={styles.deleteBox}>
                    <TouchableOpacity  style={styles.deleteRedButton} onPress={() => deleteTime(rowData)} >
                        <Image source={require('../assets/DeleteIcon.png')} style={styles.deleteIcon}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={styles.itemContainer}
            >

                <TouchableHighlight style={styles.itemBox1} onPress={() => {
                    setVisible();
                }}>
                    <View style={styles.timeBox}>
                        <Text style={styles.time}>{item.title} {item.key}</Text>
                        <View style={styles.switchBox}>
                            <Switch
                                trackColor={{ false: "#000000", true: "#25ff24" }}
                                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onChange={toggleSwitch}
                                value={isEnabled}
                                style={{ transform: [{ scaleX: responsive(.7) }, { scaleY: responsive(.7) }] }}
                            />

                            <View style={{zIndex: 3}}>
                                {/*<TouchableHighlight onPress={() => {*/}
                                    {/*showEditBox();*/}
                                {/*}}>*/}
                                    {/*<View style={styles.horizontalDots}>*/}
                                        {/*<Entypo name="dots-three-horizontal" size={24} color="white" />*/}
                                    {/*</View>*/}
                                {/*</TouchableHighlight>*/}

                            </View>
                        </View>
                    </View>
                </TouchableHighlight>

                <EditTime visible={modalVisible} showEdit={setVisible} newDate={item} updateTimes={updateTimes}></EditTime>
            </View>
        </SwipeRow>
    </View>
);

};

const styles = StyleSheet.create({
    hiddenRow:{
        height: responsive(75),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        zIndex: -1,
        // backgroundColor: '#ff959a'
    },
    deleteBox:{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: responsive(50)
    },
    deleteRedButton:{
        width: responsive(39),
        height: responsive(39),
        borderRadius: responsive(8),
        backgroundColor:'#ff0010',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    },
    deleteIcon:{
        width: '60%',
        height: '60%'
        // backgroundColor: '#000',
        // marginRight:5
    },
    itemContainer:{
        marginBottom: 20,
        backgroundColor: '#292929',
        //borderColor: '#ffa04c',
        borderWidth: responsive(2),
        height: responsive(70),
        width: responsive(209),
        borderRadius: responsive(15),
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 1
    },
    itemBox1:{
        // width:'75%'
        width: '100%',
        borderRadius: responsive(15),
    },
    timeBox:{
        height: '100%',
        width: '100%',
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 20
    },
    time:{
        color: '#fff',
        // fontFamily: 'Oswald_300Light',
        //fontSize: 45,
        fontFamily: 'Archivo',
        fontSize: responsive(32),
        //borderColor: 'red',
        //borderWidth: 1,
    },
    // editContainer:{
    //   flexDirection:'row'
    // },
    // editBox:{
    //     //backgroundColor: '#4043ff',
    //     borderRadius: 4,
    //     color: '#ff6773',
    //     //borderColor: '#ffd61d',
    //     borderWidth: 1,
    //     marginTop: 10,
    //     width: 100
    // },
    switchBox:{
        // flexDirection: 'column',
        // alignItems: 'flex-end',
        // marginRight: 5
        width: responsive(42),
        flexDirection: 'column',
        // backgroundColor: '#fff'
    },
    horizontalDots:{
        color: '#ff0006',
       //  borderWidth: 1,
       // borderColor: 'white',
        marginTop: responsive(3),
        borderRadius: 10,
        width: 60,
        alignItems: 'center',
    },
    dotsModalBackground:{
        position: 'absolute',
        left:0,
        height: 400,
        width: 350,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: '#fff',
        zIndex: 3333
    },
    modalBox:{
        // position: 'absolute',
        // left:0,
        zIndex: 0,
        height: '100%',
        // width: '100%',
        borderWidth: 1,
        //borderColor: 'green',
        backgroundColor: '#fff',
        opacity: 0.1,
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    dotsModal:{
        width: responsive(130),
        borderRadius: 10,
        position: 'absolute',
        //top: responsive(140),
        left: responsive(90),
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor:'#fff',
        zIndex: 3
    },
    dotsModalText:{
        color: '#616161',
        padding: 12,
        borderBottomColor: '#9b9b9b',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dotsModalCancel:{
        color: '#616161',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconImage:{
        width: 22,
        height: 22,
        backgroundColor: '#fff'
    },
});
