import axios from "axios";

export let client = axios.create({baseURL: "https://localhost:7143"});

export const isAuthed = () => {
    return client.defaults.headers.common["Authorization"] !== "";
}

export const clearAuth = () => {
    client.defaults.headers.common["Authorization"] = "";
}