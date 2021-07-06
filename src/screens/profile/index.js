import React, { useEffect, useState, useReducer, useRef } from "react";

import {
    View,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Image, 
    TextInput,
    Keyboard
} from "react-native";

import AuthContext from "../../utils/authContext";

import { colors } from "../../config/style";
import {stylesheet} from "./styles";
import PencilSVG from "../../assets/images/pencil_icon.svg";
import {launchImageLibrary} from 'react-native-image-picker';
import BottomSheet from "../../components/modal/bottom_sheet";
import {MediaUploadIndividualImage, MediaLoadImages, UserUpdateUserName} from "../../libraries/api";
import {getAuthToken} from "../../libraries/storage_manager";

export default function Profile(){
    
    let otherImage = require("../../assets/images/user_photo_placeholder.png");

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [authToken, setAuthToken] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let newNameInputRef = useRef(null);

    var auth_manager = React.useContext(AuthContext);

    let options = {
        mediaType: "photo",
        quality: 0.5,
        includeBase64: false,
        saveToPhotos: false,
    };

    function selectImage(imageIndex, image_id){
        if(isOpen == false){
            setIsOpen(true);
            launchImageLibrary(options, (response) => {
                
                if(response.didCancel != true){     
                    let newImage = {uri: response.uri, type: response.type, name: response.fileName};
                    let formData = new FormData();
                    
                    formData.append("auth_token", authToken);

                    if(image_id != null && image_id != false && image_id != undefined){
                        formData.append("image_id", image_id);
                    }
                    
                    formData.append("image", newImage);

                    if(imageIndex == 1){
                        setImage1({uri: response.uri, image_id: image_id});
                    }
                    if(imageIndex == 2){
                        setImage2({uri: response.uri, image_id: image_id});
                    }
                    if(imageIndex == 3){
                        setImage3({uri: response.uri, image_id: image_id});
                    }
                    
                    setIsOpen(false);
                    MediaUploadIndividualImage(formData, (response) => {
                    }); 
                }
                else{
                    setIsOpen(false);
                }
            });
        }
    }

    function openModal(){
        setIsModalVisible(true);
    }

    useEffect(() => {
        if(isModalVisible == true){
            setTimeout(() => {
                newNameInputRef.current.focus();
            }, 300);
        }
    }, [isModalVisible]);

    function updateUsername(){
        if(newUsername.trim().length > 0){
            UserUpdateUserName(authToken, newUsername, function(response){
                setUsername(newUsername);
                setNewUsername("");
                setIsModalVisible(false);
            });
        }
    }
    
    useEffect(() => {
        if(authToken!=null){
            MediaLoadImages(authToken, (response) => {
                if(response != false){
                    setUsername(response.username);
                    response.images.map((image, index) => {
                        switch(index){
                            case 0:
                                setImage1({uri: image.url, image_id: image.image_id});
                            break;
                            case 1:
                                setImage2({uri: image.url, image_id: image.image_id});
                            break;
                            case 2:
                                setImage3({uri: image.url, image_id: image.image_id});
                            break;
                        }
                    });
                }      
                setIsLoading(false); 
            });

        }
    }, [authToken]);

    useEffect(() => {
        getAuthToken().then((authToken) => {
            setAuthToken(authToken);
        });
    }, []);

    if(isLoading){
        return(
            <View style={[stylesheet.background, stylesheet.loadingScreen]}>
                <ActivityIndicator size={40} color={colors.accent}></ActivityIndicator>
            </View>
        );
    }
    else{
        return(
            <View style={{flex: 1}}>
                
                <BottomSheet
                        callBackCloseModal={() => {setIsModalVisible(false)}}
                        modalVisible={isModalVisible}>
                    <View style={stylesheet.aa}>
                        <TextInput 
                            ref={newNameInputRef}
                            style={stylesheet.bbc} 
                            autoFocus={true}
                            value={newUsername}
                            onChangeText={(value) => {setNewUsername(value)}}
                            placeholderTextColor={"#aaa"}
                            placeholder={"Nome de utilizador"}></TextInput>   
                        
                        <TouchableOpacity onPress={() => {updateUsername()}}>
                            <View style={stylesheet.saveBTN}>
                                <Text style={stylesheet.saveBTNText}>Guardar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>

                <ScrollView style={stylesheet.scrollview}>
                    <View style={stylesheet.background}>
                        <StatusBar backgroundColor={colors.statusbar}/>
                        <Text style={stylesheet.title}>Perfil</Text>
                        <View style={stylesheet.images}>
                            <View style={stylesheet.left}>
                                <TouchableOpacity onPress={() => {selectImage(1, image1 == null ? false : image1.image_id)}}>
                                    <View style={stylesheet.editIconView}>
                                        <PencilSVG width={26} height={26}/>
                                    </View>
                                    <Image style={stylesheet.largeImage} source={image1 == null ? otherImage : {uri:image1.uri}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesheet.right}>
                                <TouchableOpacity onPress={() => {selectImage(2, image2 == null ? false : image2.image_id)}}>
                                    <View style={stylesheet.editIconView}>
                                        <PencilSVG width={26} height={26}/>
                                    </View>
                                    <Image style={stylesheet.smallImages} source={image2 == null ? otherImage : {uri:image2.uri}}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {selectImage(3, image3 == null ? false : image3.image_id)}}>
                                    <View style={stylesheet.editIconView}>
                                        <PencilSVG width={26} height={26}/>
                                    </View>
                                    <Image style={stylesheet.smallImages} source={image3 == null ? otherImage : {uri:image3.uri}}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={stylesheet.texts}>
                            <Text style={stylesheet.textLabel}>Nome de utilizador</Text>
                            <TouchableOpacity style={stylesheet.row} onPress={() => {openModal()}}>
                                <Text style={stylesheet.textValue}>{username}</Text>
                                <PencilSVG style={stylesheet.smallIcon} width={20} height={20}/>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}