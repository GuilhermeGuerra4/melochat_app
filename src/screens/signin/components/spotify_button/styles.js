import React from "react";
import {StyleSheet} from "react-native";
import {colors} from "../../../../config/style";

export const stylesheet = StyleSheet.create({
    background: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 100,
        minHeight: 60,
        width: 280,
        height: "auto",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
    },  
    text: {
        color: colors.accent,
        fontWeight: "700",
        fontSize: 17,
        marginRight: 20,
    },
    logo: {
        width: 120,
        height: 37,
    },
});