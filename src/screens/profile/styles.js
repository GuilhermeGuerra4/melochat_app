import {StyleSheet} from "react-native";
import {colors} from "../../config/style";
import {Dimensions} from "react-native";

export const stylesheet = StyleSheet.create({
    scrollview: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    loadingScreen: {
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.primary,
        alignItems: "center",
    },
    title: {
        fontSize: 23,
        color: "#ddd",
        fontWeight: "bold",
        paddingTop: 50,
    },
    images: {
        width: "80%",
        maxWidth: 400,
        height: "auto",
        paddingTop: 60,
        paddingBottom: 0,
        flexDirection: "row",
    },
    left: {
        width: "65%",
        marginRight: "5%",
        height: "auto",
    },
    right: {
        width: "30%",
        height: "auto",
    },
    largeImage: {
        width: "100%",
        height: 300,
        borderRadius: 5,
    },
    smallImages: {
        borderRadius: 5,
        width: "100%",
        height: 140,
        marginBottom: 20,
    },
    editIconView: {
        position: "absolute",
        width: 40,
        height: 40,
        borderRadius: 100,
        right: 5,
        top: 5,
        backgroundColor: colors.secondary,
        opacity: 0.5,
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    texts: {
        width: "80%",
        height: "auto",
        padding: 0,
        paddingTop: 20,
        paddingBottom: 0,
        maxWidth: 400,
    },
    textLabel: {
        color: "#8E8E8E",
        fontSize: 17,
    }, 
    textValue: {
        color: "#ddd",
        marginTop: 5,
        fontSize: 23,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    smallIcon: {
        marginLeft: 10,
    },
    bbc: {
        width: "100%",
        height: "auto",
        borderRadius: 5,
        paddingLeft: 15,
        backgroundColor: "#474747",
        color: "#fff",
    },
    aa: {
        width: "80%",
        alignSelf: "center",
    },
    saveBTN: {
        backgroundColor: colors.accent,
        width: 140,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginTop: 10,
    },
    saveBTNText: {
        color: "#ddd",
    },
});