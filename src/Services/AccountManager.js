import {client, isAuthed, clearAuth} from "./http-client";

export const Login = async (email, password) => {
    await client
        .post("/login", {email: email, password: password})

        .then((response) => {
            if (response.status === 200) {
                client.defaults.headers.common["Authorization"] = "Bearer " + response.data["token"];
                return true;
            } else {
                console.log(response.data["errors"]);
                return false;
            }
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
};

export const Register = async (email, password) => {
    await client
        .post("/register", {email: email, password: password}).then((response) => {

            if (response.status === 200) {
                client.defaults.headers.common["Authorization"] = "Bearer " + response.data["token"];
                return true;
            } else {
                console.log(response.data["errors"]);
                return false;
            }
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}

export const ChangePassword = async (currentPassword, newPassword) => {
    if (isAuthed === true) {
        await client
            .post("/ChangePassword", {currentPassword: currentPassword, newPassword: newPassword})
            .then((response) => {
                if (response.status === 200) {
                    return true;
                } else if (response.status === 401) {
                    clearAuth();
                } else {
                    console.log(response.data);
                    return false;
                }
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    }
}