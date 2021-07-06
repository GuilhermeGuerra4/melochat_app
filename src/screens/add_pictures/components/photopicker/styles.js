import React from "react";
import {StyleSheet} from "react-native";
import {colors} from "../../../../config/style";

export const stylesheet = StyleSheet.create({
    imageUploader: {
        width: "26%",
        maxWidth: 110,
        height: 140,
        margin: 10,
        backgroundColor: colors.secondary,
    },  
    pressableArea: {
        position: "absolute",
        width: 90,
        height: 90,
        top: -35,
        left: -35,
        alignItems: "center",
        zIndex: 10,
        justifyContent: "center",
    },
    removeButton: {
        borderRadius: 100,
        height: 36,
        width: 36,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.danger,
    },
    removeButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
    imagePreview: {
        width: "100%",
        height: "100%",
    }, 
    buttonBackground: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.thirdary,
    },
    buttonText: {
        color: "#fff",
        fontSize: 50,
    },
});