import React, {useState} from "react"; 
import {View, Text, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback} from "react-native";

export default function bottomSheet(props){

	async function clickOutside(){
		props.callBackCloseModal();
	}

	if(props.modalVisible == true){
		return(
			<View style={styles.aaa}>
				<Modal 
					onShow={props.onShow}
					closeOnClick={true} transparent={true} animationType={"slide"} visible={props.modalVisible}>
					<TouchableWithoutFeedback style={styles.tr} onPress={clickOutside}>
						<View style={styles.container}></View>
					</TouchableWithoutFeedback>
					<View style={styles.window}> 
						{props.children}
					</View>
				</Modal>

				<View style={styles.dark}></View>
			</View>
		);
	}
	else{
		return(null);
	}

}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		height: Dimensions.get("window").height,
	},
	window: {
		position: "absolute",
		width: "100%",
		height: "auto",
		minHeight: "auto",
        padding: 50,
		bottom: 0,
		backgroundColor: "#383838",
	},
	dark: {
		position: "absolute",
		width: "100%",
		height: Dimensions.get("window").height,
		zIndex: 4,
		backgroundColor: "#000",
		opacity: 0.5,
	},
});