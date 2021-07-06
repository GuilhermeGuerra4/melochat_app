import React, {useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
import {colors} from "../../config/style";


export const stylesheet = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.primary,
    },  
    safe: {
        alignItems: "center",
        justifyContent: "center",
    },
    addPhotoText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 35,
    },
    buttonGroup: {
        flexDirection: "row",
    },  
    saveButtonBackground: {
        width: 180,
        backgroundColor: colors.accent,
        height: "auto",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 20,
        marginBottom: 14,
        borderRadius: 3,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
    skipButtonBackground: {
        width: "auto",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 9,
        paddingBottom: 9,
        alignItems: "center",
        borderRadius: 3,
    },
    skipButtonText: {
        textAlign: "center",
        color: "#fafafa",
        fontSize: 18,
    },
});