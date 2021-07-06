import React from "react";
import {StyleSheet} from "react-native";
import {colors} from "../../config/style";

export const stylesheet = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.primary,
    },  
    header: {
        zIndex: 100,
        backgroundColor: colors.primary,
    },
    loadingScreen: {
        justifyContent: "center",
        alignItems: "center"
    },
    headerBackground: {
        width: "100%",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        marginTop: 5,
        marginBottom: 0,
    },
    contactsLabel: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        margin: 10,
    },
    contacts: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    contactBackground: {
        height: "auto",
        width: "100%",
        backgroundColor: colors.secondary,
        borderBottomColor: "#333",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100,
        backgroundColor: colors.secondary,
    },
    contactUsernameText: {
        textAlignVertical: "center",
        color: "#fff",
        fontSize: 18,
    },
    messageDot: {
        width: 10,
        height: 10,
        borderRadius: 100,
        position: "absolute",
        right: "5%",
        backgroundColor: colors.danger,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tt: {
        color: "#ddd",
        fontWeight: "bold",
        fontSize: 21,
    },
    aa: {
        width: 190,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.accent,
        borderRadius: 4,
    },
    bbb: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#ddd",
    }
});