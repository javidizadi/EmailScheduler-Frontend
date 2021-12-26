import axios from "axios";

export const response = {
    isSucceed: false,
    result: null,
};

class http_client {

    static client = axios.create({baseURL: "https://localhost:7143"}); // it's temp for dev process

    static CheckAuth() {
        return this.client.defaults.headers.common["Authorization"] !== "";
    };

    static Auth(token) {
        this.client.defaults.headers.common["Authorization"] = "Bearer " + token;
    };

    static ClearAuth() {
        this.client.defaults.headers.common["Authorization"] = "";
    };
}

export default http_client;