import axios from "axios";

export let client = axios.create({ baseURL: "https://localhost:7143" }); // it's temp for dev process

export const response = {
  isSucceed: false,
  result: null,
};

export const CheckAuth = () => {
  return client.defaults.headers.common["Authorization"] !== "";
};

export const Auth = (token) => {
  client.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export const ClearAuth = () => {
  client.defaults.headers.common["Authorization"] = "";
};
