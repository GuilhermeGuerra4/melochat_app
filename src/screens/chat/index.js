import React, { useEffect, useState, useReducer } from "react";
import {View, Text, StatusBar, TouchableOpacity,BackHandler, ActivityIndicator, Image, TextInput, TouchableNativeFeedback, FlatList} from "react-native";
import { colors } from "../../config/style";
import {stylesheet} from "./styles";
import {ChatSendMessage, ChatLoadMessages} from "../../libraries/api";
import {getAuthToken} from "../../libraries/storage_manager";
import Socket from "../../libraries/socketio";
import uuid from "react-native-uuid";
import { useBackHandler } from '@react-native-community/hooks';

export default function Chat(props){
    const [userid, setUserId] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const defaultPhoto = require("../../assets/images/user_photo_placeholder.png");
    const  [newMessage, setNewMessage] = useState(null);

    // Dispacher
    const fetchMessages = (state, action) => {
        switch (action.type) {
            case "NEW_MESSAGE":
                if(state?.messages?.length > 0){
                    return {...state, messages: [action?.message, ...state?.messages]}
                }
                else{
                    return {...state, messages: [action?.message]}
                }
            case "LOAD_ALL_MESSAGES":
                return {...state, messages: action.messages}
            case "CLEAR":
                return {...state, messages: []}
            case "DEFINE_AUTH_TOKEN":
                return {...state, authToken: action.authToken}
            case "DEFINE_OTHER_USER":
                return {...state, other_user: action.user}
            case "SOCKET_RECEIVED_NEW":
                return {...state, newMessage: action.newSocket}
            default:
                return state;
        }
    };

    const [state, messagesDispach] = useReducer(fetchMessages, {
        messages: [],
        authToken: null,
        socket: null,
        newMessage: null,
        other_user: {id: null, photo: null, name: null},
    });

    // Send messages
    function sendMessageHandler(){
        if(inputValue?.trim().length > 0){
            ChatSendMessage(state.authToken, userid, inputValue, (response) => {
                if(response?.error == false){
                    let new_message = {"content": inputValue, "receiver_id": userid, "id": response?.message_id};
                    messagesDispach({type: 'NEW_MESSAGE', message: new_message})
                    setInputValue("");
                }
            });
        }
    }

    // BackPress
    function handleBackButtonClick(){
        if(state.messages?.length != 0){
            console.log("contacts")
            props.navigation.navigate("contacts");
        }
        else{
            console.log("chat")
            props.navigation.navigate("find");
        }

        return true;
    }

    useBackHandler(handleBackButtonClick);

    // Load messages
    function loadMessages(){
        setIsLoading(true);
        ChatLoadMessages(state.authToken, userid, (response) => {
            messagesDispach({type: 'LOAD_ALL_MESSAGES', messages: response.messages})
            setIsLoading(false);
        });
    }

    function loadAll(){        
        loadMessages();
    }

    useEffect(() => {
        loadAll();
    }, [userid]);
    
    useEffect(() =>  {
        if(state.authToken != null){
            loadAll();
        }
    }, [state.authToken]);

    useEffect(() => {
        
        try{
            setUserId(props.route.params.userId);
            setUserPhoto(props.route.params.userPhoto);
            setUserName(props.route.params.userName);
            
            let userInfo = {
                name: props.route.params.userName,
                photo: props.route.params.userPhoto,
                id: props.route.params.userId
            };

            messagesDispach({type: "DEFINE_OTHER_USER", user: userInfo})
        }
        catch(error){
            console.log(error);
        }

    }, [props.route]);

    useEffect(() => {

        if(newMessage != null){
            console.log(newMessage);
            if(props.route.params.userId == newMessage.sender_id){
                messagesDispach({type: 'NEW_MESSAGE', message: newMessage});
                setNewMessage(null);
            }
        }

    }, [newMessage]);

    useEffect(() => {
        if(state.authToken != null){
            let socket = new Socket();
            let conn = socket.connect();
            
            conn.on("wait_for_messages-"+state.authToken, (response) => {
               setNewMessage(response);
            });   
        }
    }, [state.authToken]);

    useEffect(() => {
        
        getAuthToken().then((authToken) => {
            messagesDispach({type: 'DEFINE_AUTH_TOKEN', authToken: authToken});
        });

    }, []);


    // Component functions

    function loadingView(){
        return(
            <View style={{flex: 1,alignItems: "center",justifyContent: "center"}}>
                <ActivityIndicator color={"#0088ff"} size={45}/>
            </View>
        );  
    }
    
    function FlatListEmpty(){
        if(isLoading){
            loadingView(); 
        }
        else{
            return(null);
        }
    }

    function generateKey(item){
        return uuid.v1();
    }

    function renderItem(item){
        item = item.item;
        return(
            <View style={item.receiver_id == userid ? stylesheet.right : stylesheet.left}>
                <Text style={item.receiver_id == userid ? {color: "#ddd"} : {color: "#BCBCBC"}}>{item.content}</Text>
            </View>
        );
    }

    return(
        <View style={stylesheet.background}>
            <View style={stylesheet.header}>
                <Image style={stylesheet.image} source={(userPhoto == null ? (defaultPhoto) : ({uri: userPhoto}))}/>
                <View style={stylesheet.align}>   
                    <Text style={stylesheet.title}>{userName}</Text>
                    <Text style={stylesheet.status}></Text>
                </View>
            </View>

            {isLoading ? (loadingView()) : (
            <FlatList style={stylesheet.msgs}
                data={state.messages}
                keyExtractor={item => item.id}
                renderItem={(item) => renderItem(item)}
                initalNumToRender={20}
                inverted={-1}
                ListEmptyComponent={FlatListEmpty()}
                ListHeaderComponent={<Text style={stylesheet.ReadedStatus}></Text>}
                ListFooterComponent={<View style={{ height: 0, marginBottom: 30 }}></View>}
            />
            )}

            <View style={stylesheet.in}>
                <TextInput 
                    value={inputValue} 
                    onChangeText={(value) => {setInputValue(value)}} 
                    style={stylesheet.on} 
                    color={"#ddd"}
                    placeholderTextColor={"#838383"}
                    placeholder={"Escreva algo..."} />

                <TouchableNativeFeedback 
                    onPress={sendMessageHandler}
                    background={TouchableNativeFeedback.Ripple(colors.primary, true)}
                    style={stylesheet.BtcRight}>
                    <View style={stylesheet.btc}>
                        <Text style={stylesheet.btcText}>Enviar</Text>    
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );    
}