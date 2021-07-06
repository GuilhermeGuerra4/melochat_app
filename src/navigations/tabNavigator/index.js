import React from "react";
import BottomToolbar from "./components/bottomToolBar";
import Contacts from "../../screens/contacts";
import Find from "../../screens/find";
import Profile from "../../screens/profile";
import Chat from "../../screens/chat";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {slideLeft} from "../../assets/transitions/slideLeft";

const TabStack = createBottomTabNavigator();

export default function TabNavigator({ state, descriptors, navigation }) {
    return(
        <NavigationContainer>
            <TabStack.Navigator 
                tabBar={props => <BottomToolbar {...props}/>}>
                <TabStack.Screen 
                    key={"contacts"}
                    options={{title: "Contactos"}}
                    name={"contacts"}
                    component={Contacts}/>

                <TabStack.Screen 
                    key={"find"}
                    options={{title: "Encontrar"}}
                    name={"find"}
                    component={Find}/>

                <TabStack.Screen 
                    key={"profile"}
                    options={{title: "Perfil"}}
                    name={"profile"}
                    component={Profile}/>
                
                <TabStack.Screen 
                    key={"chat"}
                    options={{title: "Chat", tabBarVisible: false}}
                    name={"chat"}
                    component={Chat}/>
            </TabStack.Navigator>
        </NavigationContainer>
    );
}