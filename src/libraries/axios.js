import axios from 'axios';
import {server} from "../config/server_connection";

let HttpConnection;

HttpConnection = axios.create({
    baseURL: server.url,
    timeout: 10000,
});

export const setClientToken = token => {
  HttpConnection.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export function serializeParams(params){
	var str = "";
	for (var key in params) {
		if (str != "") {
			str += "&";
		}
		str += key + "=" + encodeURIComponent(params[key]);
	}
	return str;
}

export default HttpConnection;