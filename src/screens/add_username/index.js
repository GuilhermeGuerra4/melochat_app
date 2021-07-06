import React, {useState, useRef, useEffect} from "react";
import {View, Text, Alert, StatusBar,SafeAreaView, TouchableOpacity, TextInput, setNativeProps} from "react-native";
import {stylesheet} from "./styles";
import { colors } from "../../config/style";
import {getAuthToken} from "../../libraries/storage_manager";
import {userUpdateUsername} from "../../libraries/api";
import AuthContext from "../../utils/authContext";

export default function AddUsername(){

    const [isSending, setIsSending] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [inputValue, setInputValue] = useState("");

    let auth_manager = React.useContext(AuthContext);


    function sendUsername(){
        if(inputValue.trim().length >= 3){
            userUpdateUsername(authToken, inputValue, (success) =>{
                if(success){
                    auth_manager.addedName();
                }
                else{
                    Alert.alert("Erro ao adicionar o nome", "Escolha um nome maior", [{text: "OK"}], {cancelable: true});
                }
            });
        }
        else{
            Alert.alert("Nome de utilizador inválido", "Escolha um nome maior", [{text: "OK"}], {cancelable: true});
        }
    }

    useEffect(() => {
        getAuthToken().then((authToken) => {
            setAuthToken(authToken);
        });
    }, []);

    if(authToken == null){
        return(<View style={stylesheet.background}><StatusBar backgroundColor={colors.statusbar}/></View>);
    }
    else{
        return(
            <View style={stylesheet.background}>
                <StatusBar backgroundColor={colors.statusbar}/>
                <SafeAreaView style={[stylesheet.safe]}>
                    <Text style={stylesheet.addPhotoText}>Nome de utilizador</Text>
                    <TextInput 
                        value={inputValue} 
                        onChangeText={(value) => {setInputValue(value)}} 
                        style={stylesheet.input} 
                        color={"#ddd"}
                        maxLength={20}
                        placeholder={"Escreva aqui..."}
                        placeholderTextColor={"#838383"}
                       />
    
                    <TouchableOpacity disabled={isSending} style={stylesheet.bbc} onPress={() => {sendUsername()}}>
                        <View style={stylesheet.saveButtonBackground}>
                            {isSending == false ? (<Text style={stylesheet.saveButtonText}>Adicionar</Text>) : (<ActivityIndicator color={"#fff"}></ActivityIndicator>)}
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    }
}