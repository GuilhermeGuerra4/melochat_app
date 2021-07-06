import React from "react";
import {StyleSheet} from "react-native";
import {colors} from "../../config/style";

export const stylesheet = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
    },  
    appname: {
        color: "#fff",
        fontSize: 29,
        marginTop: 20,
        marginBottom: 80,
        fontWeight: "bold"
    }
});