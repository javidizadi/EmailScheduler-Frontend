import { client, AuthCheck, Auth, ClearAuth } from "./http-client";

export const Login = async (email, password) => {
  try {
    let response = await client.post("/login", {
      email: email,
      password: password,
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  if (response.status === 200) {
    Auth(response.data["token"]);
    return true;
  } else {
    console.log(response.data["errors"]);
    return false;
  }
};

export const Register = async (email, password) => {
  let response;
  try {
    response = await client.post("/register", {
      email: email,
      password: password,
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  if (response.status === 200) {
    Auth(response.data["token"]);
    return true;
  } else {
    console.log(response.data["errors"]);
    return false;
  }
};

export const ChangePassword = async (currentPassword, newPassword) => {
  if (AuthCheck === true) {
    let response;
    try {
      response = await client.post("/ChangePassword", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      ClearAuth();
    } else {
      console.log(response.data);
      return false;
    }
  }
};
