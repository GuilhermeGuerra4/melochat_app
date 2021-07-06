import Connection, {serializeParams} from "./axios";

export async function verifyApiConnection(callback){
    Connection.post("/api/v1/utils/ping").then((response) => {
        if(response.data.error == false){
            callback(true);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        callback(false);
        console.log(error);
    });
}

export async function utilsGetUserInfo(authToken, callback){
    let requestPayload = {
        auth_token: authToken,
    };
    Connection.post("/api/v1/utils/get_user_info", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback(response.data.user_info);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        callback(false);
    });
}

export async function userUpdateUsername(authToken, newUsername, callback){
    let requestPayload = {
        auth_token: authToken,
        new_username: newUsername
    };
    Connection.post("/api/v1/user/update_user_name", serializeParams(requestPayload)).then((response) => {
        console.log(response)
        if(response.data.error == false){
            callback(true);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        callback(false);
    });
}

export async function ApiAuthSignIn(accessToken, callback){
    let requestPayload = {
        spotify_token: accessToken,
    };

    Connection.post("/api/v1/auth/signin", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback(true, response.data.auth_token);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        callback(false);
        console.log(error);
    });
}

export async function MediaUploadImages(form, callback){
    Connection.post("/api/v1/media/upload_images", form).then((response) => {
        callback(response.data.error);
    }).catch((error) => {
        callback(false);
    });
}

export async function ConnectionFindPeople(authToken, callback){
    let requestPayload = {
        auth_token: authToken,
    };
    Connection.post("/api/v1/connection/find_people", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback(response.data.users);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        callback(false);
    });
}

export async function ConnectionSwapUser(authToken, userBeingSwappedId, callback){
    let requestPayload = {
        auth_token: authToken,
        user_being_swapped_id: userBeingSwappedId
    };
    Connection.post("/api/v1/connection/swap_user", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback(true);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        console.log(error);
        callback(false);
    });
}

export async function ChatSendMessage(authToken, userReceiverId, message, callback){
    let requestPayload = {
        auth_token: authToken,
        user_receiver_id: userReceiverId,
        message: message,
    };

    Connection.post("/api/v1/chat/send_message", serializeParams(requestPayload)).then((response) => {
        console.log(response.data);
        if(response.data.error == false){
            callback({error: false, message_id: response.data.message_id});
        }
        else{
            callback({error: true});
        }
    }).catch((error) => {
        console.log(error);
        callback({error: true});
    });
}

export async function ChatLoadMessages(authToken, otherUserId, callback){
    let requestPayload = {
        auth_token: authToken,
        other_user_id: otherUserId,
    };

    Connection.post("/api/v1/chat/load_messages", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback({messages: response.data.messages, quantity: response.data.quantity});
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        console.log(error);
        callback(false);
    });
}

export async function ConnectionLoadConnections(authToken, callback){
    let requestPayload = {
        auth_token: authToken,
    };

    Connection.post("/api/v1/connection/load_connections", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback({connections: response.data.connections});
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        console.log(error);
        callback(false);
    });
}

export async function MediaLoadImages(authToken, callback){
    let requestPayload = {
        auth_token: authToken,
    };

    Connection.post("/api/v1/media/load_images", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback(response.data);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        console.log(error);
        callback(false);
    });
}

export async function MediaUploadIndividualImage(form, callback){
    Connection.post("/api/v1/media/upload_individual_image", form).then((response) => {
        if(response.data.error == false){
            callback(true);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        console.log(error);
        callback(false);
    });
}

export async function UserUpdateUserName(authToken, username, callback){
    let requestPayload = {
        auth_token: authToken,
        new_username: username,
    };

    Connection.post("/api/v1/user/update_user_name", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback(true);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        console.log(error);
        callback(false);
    });
}

export async function ConnectionBlockUser(authToken, user_id, callback){
    let requestPayload = {
        auth_token: authToken,
        user_id: user_id,
    };

    Connection.post("/api/v1/connection/block_user", serializeParams(requestPayload)).then((response) => {
        if(response.data.error == false){
            callback(true);
        }
        else{
            callback(false);
        }
    }).catch((error) => {
        console.log(error);
        callback(false);
    });
}