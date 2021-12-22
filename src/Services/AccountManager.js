import { client, CheckAuth, Auth, ClearAuth, response } from "./http-client";

export const Login = async (email, password) => {
  let result = Object.create(response);
  let serverResponse;
  const userInfo = {
    email: email,
    password: password,
  };

  try {
    serverResponse = await client.post("/login", userInfo);
  } catch (error) {
    console.log(error);
    result.isSucceed = false;
    return result;
  }

  if (serverResponse.status === 200) {
    Auth(serverResponse.data["token"]);
    result.isSucceed = true;
  } else {
    result.isSucceed = false;
    result.result = serverResponse.data["errors"];
  }
  return result;
};

export const Register = async (email, password) => {
  let result = Object.create(response);
  let serverResponse;
  let userInfo = {
    email: email,
    password: password,
  };

  try {
    serverResponse = await client.post("/register", userInfo);
  } catch (error) {
    console.log(error);
    result.isSucceed = false;
    return result;
  }

  if (serverResponse.status === 200) {
    Auth(serverResponse.data["token"]);
    result.isSucceed = true;
  } else {
    result.isSucceed = false;
    result.result = serverResponse.data["errors"];
  }
  return result;
};

export const ChangePassword = async (currentPassword, newPassword) => {
  if (CheckAuth() === true) {
    let result = Object.create(response);
    let serverResponse;
    const userInput = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    try {
      serverResponse = await client.post("/ChangePassword", userInput);
    } catch (error) {
      console.log(error);
      result.isSucceed = false;
      return result;
    }

    if (serverResponse.status === 200) {
      result.isSucceed = true;
    } else if (serverResponse.status === 401) {
      result.isSucceed = false;
      ClearAuth();
    } else {
      result.isSucceed = false;
      result.result = serverResponse.data;
    }
    return result;
  }
};
