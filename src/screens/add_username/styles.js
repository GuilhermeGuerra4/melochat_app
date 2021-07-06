import React, {useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
import {colors} from "../../config/style";


export const stylesheet = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },  
    safe: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    addPhotoText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 35,
    },
    bbc: {
        width: "70%",
        alignSelf: "center",
    },
    saveButtonBackground: {
        width: "50%",
        backgroundColor: colors.accent,
        height: "auto",
        paddingTop: 13,
        paddingBottom: 13,
        marginTop: 20,
        borderRadius: 3,
        alignSelf: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 17,
        textAlign: "center",
    },
    input: {
        width: "70%",
        backgroundColor: colors.secondary,
        borderRadius: 4,
        height: 55,
        fontSize: 16,
        alignItems: 'center',
        textAlign: "center",
    }
});