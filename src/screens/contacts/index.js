import React, { useState, useReducer, useEffect} from "react";
import {View, Text, Alert, StatusBar, RefreshControl, TouchableOpacity, ActivityIndicator, Image, TouchableHighlight, LogBox, FlatList} from "react-native";
import {stylesheet} from "./styles";
import { colors } from "../../config/style";
import Logo from "./../../components/logo";
import {ConnectionLoadConnections, ConnectionBlockUser} from "../../libraries/api";
import {getAuthToken} from "../../libraries/storage_manager";
import uuid from "react-native-uuid";


export default function Contacts(props){
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState([1]);
    const defaultPhoto = require("../../assets/images/user_photo_placeholder.png");
    const [authToken, setAuthToken] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    let authTokenVar = null;

    const fetchMessages = (state, action) => {
        if(action.type === 'LOAD_ALL_CONTACTS'){
            if(action.contacts.length == 0){
                return {isEmpty: true, contacts: action.contacts}
            }
            else{
                return {isEmpty: false, contacts: action.contacts}
            }
        }
        else if(action.type === 'SET_TOKEN'){
            authTokenVar  = action.authToken;
            return {authToken: action.authToken}
        }
        else{
            return state;
        }
    };

    const [state, messagesDispach] = useReducer(fetchMessages, {
        isEmpty: null,
        contacts: [],
        authToken: null,
    });

    function loadContacts(){
        setIsLoading(true);
        setRefreshing(true);
        ConnectionLoadConnections(authTokenVar, (response) => {
            if(response != false){
                messagesDispach({type: 'LOAD_ALL_CONTACTS', contacts: response.connections});
            }
            setRefreshing(false);
            setIsLoading(false);
        });
    }

    function goToChat(contact){  

        let image= null;

        if(contact.image != false){
            image = contact.image;
        }

        props.navigation.navigate("chat", {
            userId: contact.user_id,
            userPhoto: image,
            userName: contact.username
        });
    }

    useEffect(() =>  {
        if(state.authToken != null){
            loadContacts();
        }
    }, [state.authToken]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            if(authTokenVar != null){
                loadContacts();
            }
        });
        return unsubscribe;
      }, []);

    
    function addContacts(){
        props.navigation.navigate("find", {});
    }

    function deleteContact(user_id){
        let contactsUpdated = [];

        ConnectionBlockUser(authToken, user_id, function(res){
        }); 
        
        state.contacts.map((contact, index) => {
            if(contact.user_id != user_id){
                contactsUpdated.append(contact);   
            }
        });

        messagesDispach({type: 'LOAD_ALL_CONTACTS', contacts: contactsUpdated});
    }

    function deleteContactPopup(contact){
        Alert.alert("Bloquear contacto", "Esta ação é irreversível", 
        [
            {
                text: "Cancelar",
            },
            {
                text: "Bloquear",
                onPress: () => deleteContact(contact?.user_id),
            },
        ], 
        { cancelable: true }
        );
    }

    function onRefresh(){
        loadContacts();
    }

    useEffect(() => {
        getAuthToken().then((authToken) => {
            messagesDispach({type: 'SET_TOKEN', authToken: authToken});
            setAuthToken(authToken);
        });
    }, []);

    function contact(item){
        let contact = item.item;

        if(Object.keys(contact).length == 0){
            return null;
        }

        let image = (contact.image == false ? defaultPhoto : {uri: contact.image});

        return(
            <TouchableOpacity 
                activeOpacity={0.5}
                style={stylesheet.contactTouchableArea}
                onLongPress={() => {deleteContactPopup(contact)}}
                onPress={() => {goToChat(contact)}}>
                <View style={stylesheet.contactBackground}>
                    <Image 
                        style={stylesheet.profileImage}
                        source={image}/>
                    <Text style={stylesheet.contactUsernameText}>{contact.username}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function getHeader(){
        return(
            <View style={stylesheet.header}>
                <StatusBar backgroundColor={colors.statusbar}/>
                <View style={stylesheet.headerBackground}>
                    <Logo size={55} style={stylesheet.logo}/>
                </View>
                <Text style={stylesheet.contactsLabel}>Contactos</Text>
            </View>
        );
    }

    function getList(){
        return(
            <FlatList 
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>
                }
                style={stylesheet.contacts}
                data={state.contacts}
                keyExtractor={(item) => {return uuid.v1()}}
                renderItem={(item) => contact(item)}
                ListHeaderComponent={getHeader()}
                stickyHeaderIndices={isVisible}
                />
        );
    }

    function getEmptyContacts(){
        // DO IT
        return(
            <View style={stylesheet.contacts}>
                <View style={stylesheet.header}>
                    <StatusBar backgroundColor={colors.statusbar}/>
                    <View style={stylesheet.headerBackground}>
                        <Logo size={55} style={stylesheet.logo}/>
                    </View>
                </View>
                <View style={stylesheet.center}>
                    <Text style={stylesheet.tt}>Nenhum contacto </Text><Text style={stylesheet.tt}>foi adicionado ainda</Text>
                    <TouchableOpacity onPress={addContacts}>
                        <View style={stylesheet.aa}>
                            <Text style={stylesheet.bbb}>Encontrar contactos</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function loadingUI(){
        return(
            <View style={[stylesheet.background, stylesheet.loadingScreen]}>
                <ActivityIndicator size={40} color={colors.accent}></ActivityIndicator>
            </View>
        );
    }

    if(isLoading == true || refreshing == true){
        return(loadingUI());
    }
    else{
        if(state.isEmpty == true){
            return(getEmptyContacts());
        }
        else if(state.isEmpty == false){
            return(getList());
        }
        else{
            return(null);
        }
    }
}