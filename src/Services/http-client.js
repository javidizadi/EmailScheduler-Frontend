import axios from "axios";

export let instance = axios.create({baseURL: "https://localhost:7143"});

export const IsAuthed = () => {
    if (instance.defaults.headers.common["Authorization"] === "") {
        return false;
    }
    return true;
}

export const clearAuth = () => {
    instance.defaults.headers.common["Authorization"] = "";
}