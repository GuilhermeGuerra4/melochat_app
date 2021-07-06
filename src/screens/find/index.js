import React, {useEffect, useRef, useState, useReducer} from "react";
import {View, Text, StatusBar,RefreshControl, TouchableOpacity, Image, Dimensions, ScrollView, Animated, ActivityIndicator} from "react-native";
import {stylesheet} from "./styles";
import {ConnectionFindPeople, ConnectionSwapUser} from "../../libraries/api";
import {getAuthToken} from "../../libraries/storage_manager";
import { colors } from "../../config/style";

export default function Find(props){

    const animationStyle = new Animated.Value(1);
    const deviceWidth = Dimensions.get("window").width;
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [authToken, setAuthToken] = useState(null);
    const [activeMarks, setActiveMarks] = useState(["active", "not_active", "not_active"]);
    const [refreshing, setRefreshing] = useState(false);

    const [actualUser, setActualUser] = useState({images: false, username: null});
    const [usersIndex, setUsersIndex] = useState(0);
    const [ended, setEnded] = useState(false);

    let authTokenVar = null;

    let animation = animationStyle.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [-(deviceWidth), 0, (deviceWidth)],
    });

    const fetchUsers = (state, action) => {
        switch (action.type) {
            case "LOAD_CURRENT_USER":
                return {actualUser: allUsers[action.position], usersIndex: usersIndex+1, ...state}
            case "EMPTY_CURRENT_USER":
                return {actualUser: {images: false, username: false}, ...state}
            case "LOAD_ALL_USERS":
                return {allUsers: action.users, ...state}
            default:
                return state;
        }
    };

    const [state, messagesDispach] = useReducer(fetchUsers, {
        actualUser: {images: false, username: null},
        allUsers: [],
        usersIndex: 0,
    });


    function fadeOut(){
        Animated.spring(animationStyle, {
            toValue: 2,
            duration: 10,
            useNativeDriver: true,
        }).start(() => {

            animationStyle.setValue(0);
            setActualUser({username: null, images: [], match: null});

            ConnectionSwapUser(authToken, actualUser.user_id, () => {
                fadeIn(() => {
                    setActiveMarks(["active", "not_active", "not_active"]);
                    if(allUsers.length-1 > usersIndex){
                        setActualUser(allUsers[usersIndex+1]);
                        setUsersIndex(usersIndex+1);
                    }
                    else{
                        setUsersIndex(0);
                        loadMoreFromServer();
                    }
                });         
            }); 
        });
    }

    function fadeIn(callback){
        Animated.spring(animationStyle, {
            toValue: 1,
            duration: 10,
            useNativeDriver: true,
        }).start(() => {
            animationStyle.setValue(1);
            callback();
        });
    }

    function loadMoreFromServer(){
        ConnectionFindPeople(authToken, function(users){
            if(users != false){
                setAllUsers(users);
                setActualUser(users[usersIndex]);
            }
            else{
                setEnded(true);
            }
            setIsInitialLoading(false);
        });
    }

    function loadAgain(){
        ConnectionFindPeople(authToken, function(users){
            setIsInitialLoading(true);
            setRefreshing(true);
            if(users != false){
                setAllUsers(users);
                setUsersIndex(0);
                setActualUser(users[0]);
                setEnded(false);
            }
            else{
                setEnded(true);
            }
            setIsInitialLoading(false);
            setRefreshing(false);
        });
    }

    function getMarks(){
        if(actualUser != undefined){
            if(actualUser.images.length < 2 || actualUser.images == false){
                return(null);
            }
            else{
                
                return(
                    <View style={stylesheet.marks}>
                        {actualUser.images.map((item, index) => {
                            return <View key={index+1} style={[stylesheet.mark, {opacity: (activeMarks[index] == "active" ? 1 : 0.2 )}]}></View>
                        })}
                    </View>
                );
            }
        }
    }

    function getImages(){
        if(actualUser != null){
            if(actualUser.images != false){
                return(actualUser.images.map((item, index) => {
                    return(<Image key={index} style={stylesheet.image} source={{uri: item}}/>);
                }));
            }
            else{
                return(<Image style={stylesheet.image} source={require("../../assets/images/user_photo_placeholder.png")}/>);
            }
        }
    }

    function getArtistsInComumn(){
        if(actualUser != null){
            if(actualUser.artists_in_comumn != null){
                return(actualUser.artists_in_comumn.map((item, index) => {
                    return(
                        <View key={index} style={stylesheet.artist}>
                            <Text style={stylesheet.artistText}>{item}</Text>
                        </View>
                    );
                }));
            }
        }
    }

    function _onScroll(event){
        
        const dragOffset = event.nativeEvent.contentOffset.x;
        const width = event.nativeEvent.contentSize.width;

        if(dragOffset < (width / 3)){
            setActiveMarks(["active", "not_active", "not_active"]);
        }
        else if(dragOffset >= (width / 3) && dragOffset < ((width / 3) * 2)){
            setActiveMarks(["not_active", "active", "not_active"]);
        }
        else if(dragOffset >= ((width / 3) * 2)){
            setActiveMarks(["not_active", "not_active", "active"]);
        }
    }


    function chatNow(){
        let image;

        if(actualUser.images.length > 0){
            image = actualUser.images[0];
        }
               
        props.navigation.navigate("chat", {
            userId: actualUser.user_id,
            userPhoto: image,
            userName: actualUser.username
        });
    }

    useEffect(() =>  {
        if(authToken != null){
            authTokenVar = authToken;
            loadMoreFromServer();
        }
        const unsubscribe = props.navigation.addListener('focus', () => {
            if(authTokenVar != null){
                loadAgain();
            }
        });
        return unsubscribe;
    }, [authToken]);

    function onRefresh(){
        console.log("pulled");
        loadAgain();
    }

    useEffect(() => {
        getAuthToken().then((authToken) => {
            setAuthToken(authToken);
        });
    }, []);

    if(isInitialLoading == true){
        return(
            <View style={[stylesheet.background, stylesheet.loadingScreen]}>
                <StatusBar backgroundColor={colors.statusbar}/>
                <ActivityIndicator size={40} color={colors.accent}></ActivityIndicator>
            </View>
        );
    }
    else{
        if(ended == true){
            return(
                <ScrollView 
                
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                    }
                    style={[stylesheet.background, {paddingTop: (Dimensions.get("window").height / 2) - 80}]}>
                    <StatusBar backgroundColor={colors.statusbar}/>
                    <Text style={stylesheet.noUsersTitle}>Não foram encontradas pessoas</Text>
                    <Text style={stylesheet.noUsersTitle}>Volte mais tarde!</Text>
                </ScrollView>
            );
        }
        else if(actualUser?.username != null){
            return(
                <View style={stylesheet.background}>
                    <StatusBar backgroundColor={colors.statusbar}/>
                    <Animated.ScrollView 
                        style={{transform: [{translateX: animation}]}} 
                        refreshControl={
                        <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh} />}>
                        
                        <View style={stylesheet.scrollContainer}>
                            
                            {getMarks()}

                            <ScrollView 
                                style={stylesheet.carrousel}
                                horizontal={true}
                                pagingEnabled={true}
                                scrollEnabled={true}
                                onScroll={_onScroll} 
                                showsHorizontalScrollIndicator={true}>
                                    
                                {getImages()}

                            </ScrollView>
                        </View>

                        <View style={stylesheet.infoPanel}>
                            
                            
                            <View style={stylesheet.userName}>
                                <Text style={stylesheet.userNameText}>{actualUser?.username}</Text>
                            </View>

                            <View style={stylesheet.matchLabel}>
                                <Text style={stylesheet.matchText}>{actualUser?.match}% Match</Text>
                            </View>

                        </View>

                        {
                        /*
                        <View style={stylesheet.bioView}>
                            <Text style={stylesheet.bioText}>Cool bio.</Text>
                        </View>*/
                        }

                        <View style={stylesheet.buttons}>
                            <TouchableOpacity onPress={chatNow} style={stylesheet.button}>
                                <Text style={stylesheet.buttonTextSuccess}>Enviar mensagem</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={fadeOut} style={stylesheet.button}>
                                <Text style={stylesheet.buttonTextDanger}>Próximo</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={stylesheet.artists}>
                            <Text style={stylesheet.artistsTitle}>Em comum</Text>
                            {getArtistsInComumn()}
                        </View>

                        <View style={stylesheet.bottomMargin}></View>

                    </Animated.ScrollView>
                </View>
            );
        }
        else{
            return(
                <View style={[stylesheet.background, stylesheet.loadingScreen]}>
                    <StatusBar backgroundColor={colors.statusbar}/>
                </View>
            );
        }
    }
}