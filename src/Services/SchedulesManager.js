import {client, isAuthed, clearAuth} from "./http-client";

export const AddSchedule = async (subject, body, sendTo, sendTime) => {
    if (isAuthed() === true) {

        let schedule = {
            subject: subject,
            body: body,
            sendTo: sendTo,
            sendTime: sendTime
        }

        await client.post("/schedules", schedule)
            .then((response) => {
                if (response.status === 200) {
                    return true;
                } else if (response.status === 401) {
                    clearAuth();
                    return false;
                } else {
                    return false;
                }
            })
            .catch(() => {
                return false;
            });
    } else {
        return false;
    }
}

export const GetSchedules = async () => {
    if (isAuthed() === true) {
        await client.get("/schedules").then((response) => {
            if (response.status === 200) {
                return response.data;
            } else if (response.status === 401) {
                clearAuth();
                return [];
            } else {
                console.log(response.status);
                return [];
            }
        })
            .catch(() => {
                return false;
            });
    } else {
        return [];
    }
}
export const GetSchedule = async (id) => {
    if (isAuthed() === true && id != null) {
        await client.get("/schedules/" + id).then((response) => {
            if (response.status === 200) {
                return response.data;
            } else if (response.status === 401) {
                clearAuth();
                return {};
            } else {
                console.log(response.status);
                return {};
            }
        })
            .catch(() => {
                return false;
            });
    } else {
        return {};
    }
}

export const DeleteSchedule = async (id) => {
    if (isAuthed() === true && id != null) {
        await client.delete("/schedules/" + id).then((response) => {
            if (response.status === 200) {
                return true;
            } else if (response.status === 401) {
                clearAuth();
                return false;
            } else {
                return false;
            }
        })
            .catch(() => {
                return false;
            });
    } else {
        return false;
    }
}

export const UpdateSchedule = async (id, subject, body, sendTo, sendTime) => {
    if (isAuthed() === true && id != null) {

        let newSchedule = {
            id: id,
            subject: subject,
            body: body,
            sendTo: sendTo,
            sendTime: sendTime
        }

        await client.put("/schedules", newSchedule).then((response) => {
            if (response.status === 200) {
                return true;
            } else if (response.status === 401) {
                clearAuth();
                return false;
            } else {
                return false;
            }
        })
            .catch(() => {
                return false;
            });
    } else {
        return false;
    }
}