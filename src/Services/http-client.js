import axios from "axios";

export const response = {
    isSucceed: false,
    result: null,
};

class client {

    client = {};

    constructor() {

        this.client = axios.create({baseURL: "https://api.emailscheduler.javidizadi.ir"});

        const token = localStorage.getItem("token");

        if (token != null) {
            this.Auth(token);
        }

    }


    CheckAuth() {
        return this.client.defaults.headers.common["Authorization"] !== "";
    };

    Auth(token) {
        this.client.defaults.headers.common["Authorization"] = "Bearer " + token;
    };

    ClearAuth() {
        this.client.defaults.headers.common["Authorization"] = "";
        localStorage.clear();
    };
}

const http_client =  new client();

export default http_client;