import React from "react";
import {View, Text, StatusBar} from "react-native";
import {stylesheet} from "./styles";
import Logo from "./../../components/logo";
import { colors } from "../../config/style";

export default function Splash(){
    return(
        <View style={stylesheet.background}>
            <StatusBar backgroundColor={colors.statusbar}/>
            <Logo size={160}/>
        </View>
    );
}