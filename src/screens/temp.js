import React from "react";
import {Text, View} from "react-native";
import Spotify from 'rn-spotify-sdk';


const app = () => {

    let options = {
        clientID: "2e1f52632fd249d48041dc70177015a2",
        showDialog: true,
        scopes : ["user-read-email", "user-top-read"],
        redirectURL: "com.melochat://",
    };

    Spotify.initialize(options);

    async function login(){
        Spotify.login(options).then((res) => {
            if(res){
                Spotify.getSessionAsync().then((res) => {
                    console.log(res);
                });
            }
        });
    }

    login();


    return(
        <View>
            <Text>HEHEY</Text>
        </View>
    );
};

export default app;