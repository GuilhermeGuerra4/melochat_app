import AsyncStorage from '@react-native-async-storage/async-storage';

// auth_token
export async function getAuthToken(){
    let authToken = await getData("auth_token");
    return authToken;
}

export async function setAuthToken(value){
    setData("auth_token", value);
}

export async function clearAuthToken(){
    removeData("auth_token");
}

// images_status
export async function getPhotosStatus(){
    let photosStatus = await getData("photos_status");
    if(photosStatus == null){
        return "none";
    }
    else{
        return photosStatus;
    }
}

export async function setPhotosStatus(option="skipped"){
    // skipped | added | none
    setData("photos_status", option);
}


export async function verifyToken(){
    let token = await getAuthToken();
    if(token){
        return true;
    }
    else{
        return false;
    }
}

async function getData(key){
    let data = null;

    try{
        data = await AsyncStorage.getItem(key);
    }
    catch(error){
        console.log(error);
    }

    return data;
}

async function setData(key, value){
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
}

async function clearAllData(){
    try{
        await AsyncStorage.clear()
    }
    catch(error){
        console.log(error);
    }
}

async function removeData(key){
    
    let callback = false;

    try{
        callback = await AsyncStorage.removeItem(key);
    }
    catch(error){
        console.log(error);
    }

    return callback;
}