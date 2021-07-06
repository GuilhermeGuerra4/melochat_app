import {StyleSheet} from "react-native";
import {colors} from "../../config/style";
import {Dimensions} from "react-native";

const deviceWidth = Dimensions.get("window").width * 1.7;
const ratio = 2;

export const stylesheet = StyleSheet.create({
    background: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    header: {
        width: "100%",
        height: 70,
        backgroundColor: colors.accentdarker,
        elevation: 2,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        marginBottom: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    status: {

    },
    align:{
        height: "100%",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ddd",
        height: "100%",
        textAlignVertical: "center",
    },
    image: {
        width: 45,
        height: 45,
        margin: 8,
        borderRadius: 100 / 2,
    },
    msgs: {
        height: "auto",
        flex: 1,
        paddingTop: 10,
    },
    left: {
        marginLeft: 15,
        marginTop: 5,
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: "70%",
        alignSelf: "flex-start",
        backgroundColor: colors.secondary,
        borderRadius: 50 / 2,
        },
    right: {
        marginRight: 15,
        marginTop: 5,
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: "70%",
        backgroundColor: colors.accentdarker,
        borderRadius: 50 / 2,
        alignSelf: "flex-end",
    },
    in: {
        width: "97%",
        height:"auto",
        maxHeight: 70,
        marginBottom: 10,
        backgroundColor: colors.secondary,
        elevation: 10,
        fontSize: 20,
        marginTop: 10,
        alignSelf: "center",
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
    },
    on: {
        alignSelf: "flex-start",
        width: "80%",
        height: "100%",
        paddingLeft: 30,
        paddingRight: 10,
        paddingBottom: 10,
        minHeight: 50, //... For dynamic height
    },
    btc: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    BtcRight: {
        alignSelf: "flex-start",
    },
    btcText: {
        color: "#1F85CE",
        fontSize: 15,
        borderRadius: 100,
    },
    ReadedStatus: {
        alignSelf: "flex-end",
        marginTop: 10,
        marginRight: 25,
        color: "#888",
    },
    loading: {

    },
});