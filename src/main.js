import React, {useState, useEffect} from "react";

// screens
import TabNavigator from "./navigations/tabNavigator";
import AddPictures from "./screens/add_pictures";
import AddUsername from "./screens/add_username";

import Spotify from 'rn-spotify-sdk';

import Signin from "./screens/signin";
import NoConnection from "./screens/noconnection";
import Splash from "./screens/splash";

import {verifyApiConnection, utilsGetUserInfo} from "./libraries/api";
import {verifyToken, getAuthToken, setAuthToken, clearAuthToken, getPhotosStatus} from "./libraries/storage_manager";

import AuthContext from "./utils/authContext";


export default function app(){
    const [isLoading, setIsLoading] = useState(true);
    const [isConnectionAvailable, setIsConnectionAvailable] = useState(null);
    const [isTokenAvailable, setIsTokenAvailable] = useState(null);
    const [didUserPassedPicUpload, setDidUserPassedPicUpload] = useState(false);
    const [didUserSkippedPicUpload, setDidUserSkippedPicUpload] = useState(false);
    const [doUserHasUsername, setDoUserHasUsername] = useState(null);
    const [userAuthToken, setUserAuthToken] = useState(null);

    // verify the connection to the server
    async function establishConnection(){
        verifyApiConnection((isConnectionAvailable) => {     
            if(isConnectionAvailable){
                setIsConnectionAvailable(true);
            }
            else{
                setIsConnectionAvailable(false);
                console.log("NO INTERNET")
            }
        });
    }

    // it waits for the variable isConnectionAvailable to be set and
    // then it calls verifyAndRetrieveCredentials
    useEffect(function(){
        if(isConnectionAvailable != null){
            if(isConnectionAvailable == true){
                verifyAndRetrieveCredentials();
            }
            else{
                setIsLoading(false);
            }
        }
    }, [isConnectionAvailable]);
	
    async function verifyAndRetrieveCredentials(){
        let isTokenSaved = await verifyToken();
		if(isTokenSaved){
			let authToken = await getAuthToken();
            setUserAuthToken(authToken);
			setAuthToken(authToken);
			setIsTokenAvailable(true);
		}
        else{
            setDoUserHasUsername(false);
            setIsTokenAvailable(false);
            setIsLoading(false);
        }
	}

    useEffect(() => {
        if(userAuthToken != null){
            utilsGetUserInfo(userAuthToken, async (userinfo) => {
 
                let photoStatus = await getPhotosStatus();
                if(!userinfo){
                    setIsConnectionAvailable(false);
                    setIsLoading(false);
                }
                else{
                    if(userinfo.user_has_added_photos == true){
                        setDidUserPassedPicUpload(true);
                    }
                    else if(photoStatus == "skipped"){
                        setDidUserSkippedPicUpload(true);
                    }
                    if(userinfo.user_has_added_username){
                        setDoUserHasUsername(true);
                    }
                    else{
                        setDoUserHasUsername(false);
                    }

                    setIsLoading(false);
                }
            
            });
        }
    }, [userAuthToken]);

    // functions used to update the state
    const authContextFunctions = React.useMemo(() => ({
        signIn: async (authToken) => {
            setAuthToken(authToken);
            utilsGetUserInfo(authToken, async (userinfo) => {
                let photoStatus = await getPhotosStatus();
                if(!userinfo){
                    setIsConnectionAvailable(false);
                    setIsLoading(false);
                }
                else{
                    if(userinfo.user_has_added_photos == true){
                        setDidUserPassedPicUpload(true);
                    }
                    else if(photoStatus == "skipped"){
                        setDidUserSkippedPicUpload(true);
                    }
                    if(userinfo.user_has_added_username){
                        setDoUserHasUsername(true);
                    }
                    else{
                        setDoUserHasUsername(false);
                    }                    
                    setIsTokenAvailable(true);
                }
            
            });  
        },
        signOut: async () => {
            if(!Spotify.isInitialized()){
                Spotify.initialize({
                    showDialog: true,
                    clientID: "2e1f52632fd249d48041dc70177015a2",
                    redirectURL: "com.melochat://",
                    showDialog: false,
                    scopes: ["user-read-private", "user-read-email", "user-top-read"],
                    android: {
                        loginLoadingText: "Loading...",
                    }
                });
            }

            Spotify.logout().then(() => {
                clearAuthToken();
                setIsTokenAvailable(false);
            }).catch((error) => {
                console.log(error);
            }); 

        },
        addedName: async () => {
            setDoUserHasUsername(true);
        },
        addedImage: async () => {
            setDidUserPassedPicUpload(true);
        },
        skippedImage: async () => {
            setDidUserSkippedPicUpload(true);
        },
        reconnect: async () => {
            establishConnection();
        },
    }),[]);

    async function init(){
        establishConnection();
    }

    init();


    if(isLoading){
        return(<Splash />);
    }
    else{
        if(isConnectionAvailable){
            if(isTokenAvailable){
                if(doUserHasUsername != true){
                    return(
                        <AuthContext.Provider value={authContextFunctions}>
                            <AddUsername/>
                        </AuthContext.Provider>
                    );
                }
                else{
                    if(didUserPassedPicUpload || didUserSkippedPicUpload){
                        return(
                            <AuthContext.Provider value={authContextFunctions}>
                                <TabNavigator/>
                            </AuthContext.Provider>
                        );
                    }
                    else{
                        return(
                            <AuthContext.Provider value={authContextFunctions}>
                                <AddPictures/>
                            </AuthContext.Provider>
                        );
                    }
                }
            }
            else{
                return(
                    <AuthContext.Provider value={authContextFunctions}>
                        <Signin/>
                    </AuthContext.Provider>
                );
            }
        }
        else{
            return(
                <AuthContext.Provider value={authContextFunctions}>
                    <NoConnection />
                </AuthContext.Provider>
            );
        }
    }

};