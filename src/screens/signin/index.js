import React, { useEffect, useRef, useState} from "react";
import {View, Text, StatusBar, Alert, AppState} from "react-native";
import Spotify from 'rn-spotify-sdk';
import {stylesheet} from "./styles";
import SpotifyButton from "./components/spotify_button";
import Logo from "./../../components/logo";
import { colors } from "../../config/style";
import {ApiAuthSignIn} from "../../libraries/api";
import AuthContext from "../../utils/authContext";
import SharedGroupPreferences from 'react-native-shared-group-preferences'


export default function SignInLayout(){

    var auth_manager = React.useContext(AuthContext);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    async function init(){
        const spotifyPackageName = "com.spotify.music";

        try {
        const installed = await SharedGroupPreferences.isAppInstalledAndroid(spotifyPackageName);

        if(!Spotify.isInitialized()){
            Spotify.initialize({
                showDialog: false,
                clientID: "2e1f52632fd249d48041dc70177015a2",
                redirectURL: "com.melochat://",
                scopes: ["user-read-private", "user-read-email", "user-top-read"],
                android: {
                    loginLoadingText: "A carregar...",
                }
            });
        }

        } catch (err) {
            console.log("erro ao inicializar");
        }
    }

    useEffect(() => {

        AppState.addEventListener("change", _handleAppStateChange);

        init();

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };

    }, []);

    const _handleAppStateChange = (nextAppState) => {
        init();
    };


    function signIn(){
        if(Spotify.isInitialized()){
            Spotify.login({
                showDialog: true,
                clientID: "2e1f52632fd249d48041dc70177015a2",
                redirectURL: "com.melochat://",
                scopes: ["user-read-private", "user-read-email", "user-top-read"],
            }).then((isLogged) => {
                if(isLogged){
                    let session = Spotify.getSession();
                    let access_token = session.accessToken;
                    ApiAuthSignIn(access_token, (success, authToken=null) => {
                        if(success){
                            auth_manager.signIn(authToken);
                        }
                    });
                }
            });
        }
        else{
            Alert.alert("Erro", "A aplicação Spotify não está instalada. Instale e tente novamente.");
        }
    }

    return(
        <View style={stylesheet.background}>
            <StatusBar backgroundColor={colors.statusbar}/>
            <Logo size={160}/>
            <Text style={stylesheet.appname}>MeloChat</Text>
            <SpotifyButton onPress={signIn}/>
        </View>
    );
}