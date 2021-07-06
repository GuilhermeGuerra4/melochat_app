import React from "react";
import {
View,
Text,
TouchableHighlight,
TouchableOpacity,
StatusBar,
} from "react-native";
import AuthContext from "../../utils/authContext";

import { colors } from "../../config/style";
import {stylesheet} from "./styles";
import SvgIllustration from "../../assets/images/warning.svg";

export default function NoConnection(){

    var auth_manager = React.useContext(AuthContext);

    return(
        <View style={stylesheet.background}>
            <StatusBar backgroundColor={colors.statusbar}/>

            <SvgIllustration width={"80%"} height={300} style={{alignSelf: "center",marginBottom: 30,}}></SvgIllustration>
            <Text style={stylesheet.title}>Sem conexão com</Text><Text style={stylesheet.title}>o servidor</Text>

            {/*
            <TouchableOpacity onPress={()=>{auth_manager.reconnect}} style={stylesheet.saveButtonBackground}>
                <Text style={stylesheet.saveButtonText}>Reconnect</Text>
            </TouchableOpacity>*/}
        </View>
    );
}