import {StyleSheet} from 'react-native';
import {colors} from "../../../../config/style";

const iconSize = 28;

const stylesheet = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.toolbar,
    paddingTop: 1,
    paddingBottom: 1,
  },
    btc:{
    height: "100%",
  },
    view: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    icons: {
    width: "100%",
    height: "100%",
    marginBottom: 2,
    marginTop: 2,
    alignItems: "center",
    padding: 0,
  },
  text: {
    color: "#fff",
    marginBottom: 3,
    fontSize: 12,
  },
});

export default stylesheet;