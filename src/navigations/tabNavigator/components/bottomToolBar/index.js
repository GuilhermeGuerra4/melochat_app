import React, { useEffect, useState } from "react";
import { View, Text, TouchableNativeFeedback} from 'react-native';
import stylesheet from "./styles";

import ChatIconSelected from "./images/chat.svg";
import ChatIconOutline from "./images/chat_outline.svg";

import FindIconSelected from "./images/find.svg";
import FindIconOutline from "./images/find_outline.svg";

import ProfileIconSelected from "./images/profile.svg";
import ProfileIconOutline from "./images/profile_outline.svg";


export default function BottomToolbar(props){

    const [screenName, setScreenName] = useState(null);
    const focusedOptions = props.descriptors[props.state.routes[props.state.index].key].options;
    const iconSize = 35;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    function createButton(isFocused, label, routeName, routeKey, options, onPress, onLongPress){
        return (
            <TouchableNativeFeedback
                key={routeKey}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={stylesheet.btc}>

                <View style={stylesheet.view}>
                    {createIcon(routeName, isFocused)}
                    <Text style={[stylesheet.text, {fontWeight: isFocused == true ? "bold" : "normal"}]}>
                        {label}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    function createIcon(routeName, isFocused){
        let options = {width: iconSize, height: iconSize, fill: "#fff", style: stylesheet.icons};
        switch(routeName){
            case "contacts":
                let ChatSelected = (<ChatIconSelected {...options}/>);
                let ChatOutline = (<ChatIconOutline {...options}/>);
                return(isFocused ? ChatSelected : ChatOutline);
            break;
            case "find":
                let FindSelected = (<FindIconSelected {...options}/>);
                let FindOutline = (<FindIconOutline {...options}/>);
                return(isFocused ? FindSelected : FindOutline);
            break;
            case "profile":
                let ProfileSelected = (<ProfileIconSelected {...options}/>);
                let ProfileOutline = (<ProfileIconOutline {...options}/>);
                return(isFocused ? ProfileSelected : ProfileOutline);
            break;
        }
    }

    function getButtons(state, route, index){
        const { options } = props.descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;
        
        const onPress = () => {
            const event = props.navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });
    
            if(!isFocused && !event.defaultPrevented){
                props.navigation.navigate(route.name);
            }
        };
    
        const onLongPress = () => {
                props.navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };
        
        return(createButton(isFocused, label, route.name, route.key, options, onPress, onLongPress));
    }

    return(
        <View style={(screenName == "chat" ? {} : stylesheet.bar)}>
            {props.state.routes.map((route, index) => {
                if(route.name != "chat"){
                    return getButtons(props.state, route, index);
                }
            })}
        </View>
    );
}