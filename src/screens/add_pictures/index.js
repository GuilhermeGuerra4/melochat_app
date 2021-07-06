import React, {useState, useRef} from "react";
import {View, Text, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, Dimensions, Alert} from "react-native";
import {stylesheet} from "./styles";
import { colors } from "../../config/style";
import {launchImageLibrary} from 'react-native-image-picker';
import PhotoPicker from "./components/photopicker";
import {MediaUploadImages} from "../../libraries/api";
import {getAuthToken, getPhotosStatus, setPhotosStatus} from "../../libraries/storage_manager";
import AuthContext from "../../utils/authContext";

export default function AddPictures(){

    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height);

    Dimensions.addEventListener("change", () => {
        setDeviceHeight(Dimensions.get("window").height);
    });

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    let images = [];
    let auth_manager = React.useContext(AuthContext);

    let options = {
        mediaType: "photo",
        quality: 0.5,
        includeBase64: false,
        saveToPhotos: false,
    };

    function selectImage(imageIndex){
        launchImageLibrary(options, (response) => {
            let newImage = {uri: response.uri, type: response.type, name: response.fileName};
            if(imageIndex == 1){
                setImage1(newImage);
            }
            if(imageIndex == 2){
                setImage2(newImage);
            }
            if(imageIndex == 3){
                setImage3(newImage);
            }
        });
    }

    function removeImage(imageIndex){
        if(imageIndex == 1){
            setImage1(null);
        }
        if(imageIndex == 2){
            setImage2(null);
        }
        if(imageIndex == 3){
            setImage3(null);
        }
    }

    async function uploadImages(){
        let formData = new FormData();
        let authToken =  await getAuthToken();
        formData.append("auth_token", authToken);

        if(image1!=null){
            formData.append("images[]", image1);
        }
        if(image2!=null){
            formData.append("images[]", image2);
        }
        if(image3!=null){
            formData.append("images[]", image3);
        }

        if(image1==null && image2==null && image3 == null){
            Alert.alert("Nenhuma imagem foi escolhida", "Escolha pelo menos uma imagem antes para enviar");
        }
        else{
            setIsUploading(true);
            MediaUploadImages(formData, (error) => {
                setIsUploading(false);
                if(error == true){
                    alert("Erro ao enviar as fotos");
                }
                else{
                    setPhotosStatus("added");
                    auth_manager.addedImage();
                }
            });
        }
    }

    function skip(){
        setPhotosStatus("skipped");
        auth_manager.skippedImage();
    }

    return(
        <ScrollView contentContainerStyle={{justifyContent: "center",alignItems: "center",}} style={stylesheet.background}>
            <StatusBar backgroundColor={colors.statusbar}/>
            <SafeAreaView style={[stylesheet.safe, {height: deviceHeight}]}>
                <Text style={stylesheet.addPhotoText}>Adicione algumas fotos</Text>

                <View style={stylesheet.buttonGroup}>
                    
                    <PhotoPicker 
                        onPress={() => {selectImage(1)}} 
                        removeImage={() => {removeImage(1)}} 
                        image={image1} />

                    <PhotoPicker 
                        onPress={() => {selectImage(2)}} 
                        removeImage={() => {removeImage(2)}} 
                        image={image2} />
                    
                    <PhotoPicker 
                        onPress={() => {selectImage(3)}} 
                        removeImage={() => {removeImage(3)}} 
                        image={image3} />
                
                </View>

                <TouchableOpacity disabled={isUploading} style={stylesheet.imageUploader} onPress={() => {uploadImages()}}>
                    <View style={stylesheet.saveButtonBackground}>
                        {isUploading == false ? (<Text style={stylesheet.saveButtonText}>Enviar</Text>) : (<ActivityIndicator color={"#fff"}></ActivityIndicator>)}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={stylesheet.imageUploader} onPress={() => {skip()}}>
                    <View style={stylesheet.skipButtonBackground}>
                        <Text style={stylesheet.skipButtonText}>Adicionar depois</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}