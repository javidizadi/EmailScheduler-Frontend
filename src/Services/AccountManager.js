import {instance, IsAuthed, clearAuth} from "./http-client";

export const Login = async (email, password) => {
    await instance
        .post("/login", {email: email, password: password})

        .then((response) => {
            if (response.status === 200) {
                instance.defaults.headers.common["Authorization"] = "Bearer " + response.data["token"];
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
    await instance
        .post("/register", {email: email, password: password}).then((response) => {

            if (response.status === 200) {
                instance.defaults.headers.common["Authorization"] = "Bearer " + response.data["token"];
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
    if (IsAuthed === true) {
        await instance
            .post("/ChangePassword", {currentPassword: this.currentPassword, newPassword: this.newPassword})
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