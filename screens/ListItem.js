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
import { AppLoading } from 'expo';
import { useFonts, Font } from 'expo-font';

export default function Item( {item, navigation, updateTimes, deleteItem} ) {
    const [isEnabled, setIsEnabled] = useState(item.active);
    const [modalVisible, setModalVisible] = useState(false);
    const [dotsModalVisible, setDotsModalVisible] = useState(false);
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
        console.log('modalVisible ', modalVisible);
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


    // console.log('item index', item.index);



    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }
    return (
        <View
            style={styles.itemContainer}
            onLayout={event => {
                const layout = event.nativeEvent.layout;
                // console.log('height:', layout.height);
                // console.log('width:', layout.width);
                // console.log('x:', layout.x);
                console.log('y:', layout.y);
            }}
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
                            <TouchableHighlight onPress={() => {
                                showEditBox();
                            }}>
                                <View style={styles.horizontalDots}>
                                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                                </View>
                            </TouchableHighlight>


                            {dotsModalVisible ? (
                                <Modal
                                    transparent={true}
                                    visible={true}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                    }}>
                                    <TouchableWithoutFeedback onPress={() => {
                                        showEditBox();
                                    }}>
                                        <View style={styles.modalBox}></View>
                                    </TouchableWithoutFeedback>
                                    {/*<TouchableHighlight  onPress={() => {*/}
                                    {/*testButton();*/}
                                    {/*}}>*/}
                                    <View style={[styles.dotsModal, {top: responsive(90 * (item.index ))}]} >
                                        <TouchableOpacity onPress={() => {
                                            setVisible();
                                        }}>
                                            <View style={styles.dotsModalText}>
                                                <Text>Edit</Text>
                                                {/*<Image style={styles.iconImage} source={require('../assets/EditTimeIcon.png')} />*/}
                                                <Image style={styles.iconImage} source={require('../assets/EditIcon2.png')} />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            deleteItem(item);
                                        }}>
                                            <View style={styles.dotsModalText}>
                                                <Text>Delete</Text>
                                                {/*//style={styles.deleteIcon}*/}
                                                <Image style={styles.iconImage} source={require('../assets/DeleteIconBlack.png')} />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            showEditBox();
                                        }}>
                                            <View style={styles.dotsModalCancel}>
                                                <Text>Cancel</Text>
                                                <Image style={styles.iconImage} source={require('../assets/CancelIcon.png')} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/*</TouchableHighlight>*/}

                                </Modal>
                            ): null
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>

            <EditTime visible={modalVisible} showEdit={setVisible} newDate={item} updateTimes={updateTimes}></EditTime>
        </View>
    );

};

const styles = StyleSheet.create({
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
