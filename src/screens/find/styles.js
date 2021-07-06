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
    loadingScreen: {
        justifyContent: "center",
        alignItems: "center"
    },
    dfr: {
    }, 
    scrollContainer: {
        marginTop: 50,
        maxWidth: "100%",
    },
    carrousel: {
        borderRadius: 5,
        alignSelf: "center",
        maxWidth: deviceWidth / 2,
        minHeight: deviceWidth / 2,
    },
    image: {
        width: deviceWidth / 2,
        height: deviceWidth / 2,
        borderRadius: 10,
    },
    marks: {
        position: "absolute",
        width: 70,
        height: 25,
        zIndex: 100,
        bottom: 30,
        alignSelf: "center",
        backgroundColor: "#ccc",
        opacity: 0.3,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 100,
    },
    mark: {
        width: 12,
        marginLeft: 4,
        marginRight: 4,
        height: 12,
        backgroundColor: "#ccc",
        opacity: 0.8,
        borderRadius: 100,
    },
    infoPanel: {
        padding: 10,
        width: deviceWidth / 2,
        alignSelf: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    userName: {
        width: "50%",
    },
    matchLabel: {
        width: "50%",
    },
    matchText: {
        textAlign: "right",
        fontWeight: "bold",
        color: colors.accent,
        fontSize: 17,
    },
    userNameText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 22,
    },
    buttons: {
        width: deviceWidth / 2,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    button: {
        width: "45%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.secondary,
        marginRight: "2.5%",
        marginLeft: "2.5%",
        borderRadius: 4,
    },
    buttonTextSuccess: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#11B421",
    },
    buttonTextDanger: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#FF2D20",
    },
    artists: {
        width: deviceWidth / 2,
        alignSelf: "center",
        marginTop: 50,
    },
    artist: {
        width: "100%",
        height: "auto",
        backgroundColor: colors.secondary,
        marginBottom: 2,
        justifyContent: "center",
        padding: 15,
        borderRadius: 3,
    },
    artistText: {
        fontSize: 16,
        textAlign: "left",
        color: "#dadada",
    },
    artistsTitle: {
        color: "#ddd",
        fontSize: 20,
        marginBottom: 20,
    },
    bottomMargin: {
        width: deviceWidth / 2,
        height: 100,
    },
    bioView: {
        alignSelf: "center",
        padding: 10,
        marginTop: 30,
        width: deviceWidth / 2,
    },
    bioText:{
        fontSize: 16,
        color: "#ddd",
    },
    placeholder: {
        backgroundColor: colors.accent,
        width: "100%",
        height: 35,
    },
    noUsersTitle: {
        fontSize: 20,
        color: "#fff",
        alignSelf: "center",
    }
});