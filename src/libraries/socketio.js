import {server} from "../config/server_connection";
import io from "socket.io-client";

export default class Socket{

	constructor(){

	}

    connected = false;

	connect(){

        console.log("connecting...");

		this.socket = io(server.url, {
			transports: ["websocket"],
			autoConnect: true,
            forceNew: true,
		});
		
		this.socket.on("connect", msg => {
            this.connected = true;
			console.log("connected");
		});

		this.socket.on("connect_error", res => {
			console.log("connection closed");
			console.log(res); 
            this.connected = false;
			this.socket.close();
		});

		this.socket.open();
        this.connected = true;
		return this.socket;
	}

	close(){
        this.connected = false;
        try{
            this.socket.close();
        }
        catch(e){
            console.log("connection is not opened");
        }
	}

    isOpen(){
        return this.connected;
    }

}

/*
export function socketWaitForMessages(socket, authToken, callback){
    socket.on("wait_for_messages-"+authToken, (response) => {
        callback(response);
    });
}
*/