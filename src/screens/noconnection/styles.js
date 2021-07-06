import {StyleSheet} from "react-native";
import {colors} from "../../config/style";
import {Dimensions} from "react-native";

export const stylesheet = StyleSheet.create({
    background: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ddd",
    },
    saveButtonBackground: {
        width: 220,
        backgroundColor: colors.accent,
        height: "auto",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 20,
        marginBottom: 30,
        borderRadius: 3,
    },
    saveButtonText: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});