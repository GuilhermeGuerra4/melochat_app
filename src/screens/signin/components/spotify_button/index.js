import React from "react";
import {Text, TouchableOpacity, View, Image} from "react-native";
import {stylesheet} from "./styles";

export default function SpotifyButton(props){
    return(
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={props.onPress}>
            <View style={stylesheet.background}>
                <Text style={stylesheet.text}>Entrar com</Text>
                <Image 
                    style={stylesheet.logo}
                    source={require("../../../../assets/images/spotify_light_logo.png")}
                    />
            </View>
        </TouchableOpacity>
    );
}