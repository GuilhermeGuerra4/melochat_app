import React, { useEffect, useState } from "react";
import {Text, TouchableOpacity, View, Image, TouchableHighlight} from "react-native";
import {stylesheet} from "./styles";

export default function PhotoPicker(props){
    
    const [imageURI, setImageURI] = useState(null);
    
    useEffect(() => {
        if(props.image != null){
            setImageURI(props.image.uri);
        }
    }, [props]);

    function onPress(){
        props.onPress();
    }

    function removeImage(){
        props.removeImage();
        setImageURI(null);
    }
    
    if(imageURI == null){
        return(
            <TouchableOpacity style={stylesheet.imageUploader} onPress={() => {onPress()}}>
                <View style={stylesheet.buttonBackground}>
                    <Text style={stylesheet.buttonText}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }
    else{
        return(
            <View style={stylesheet.imageUploader}>
                <Image 
                style={stylesheet.imagePreview}
                source={{uri: imageURI}} />
                <TouchableOpacity style={stylesheet.pressableArea} onPress={() => {removeImage()}}>
                    <View style={stylesheet.removeButton}>
                        <Text style={stylesheet.removeButtonText}>X</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}