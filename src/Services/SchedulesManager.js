import http_client, {response} from "./http-client";

const getLocalDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString + "+00:00");
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}:00`;
}

export const AddSchedule = async (subject, body, sendTo, sendTime) => {
    if (http_client.CheckAuth() === true) {
        let schedule = {
            subject: subject,
            body: body,
            sendTo: sendTo,
            sendTime: sendTime,
        };
        let serverResponse;
        let result = Object.create(response);

        try {
            serverResponse = await http_client.client.post("/schedules", schedule);
        } catch (error) {
            result.isSucceed = false;
            console.log(error);
            return result;
        }

        result.isSucceed = serverResponse.status === 200;
        if (serverResponse.status === 401) {
            http_client.ClearAuth();
        }

        return result;
    }
};

export const GetSchedules = async () => {
    if (http_client.CheckAuth() === true) {
        let serverResponse;
        let result = Object.create(response);

        try {
            serverResponse = await http_client.client.get("/schedules");
        } catch (error) {
            result.isSucceed = false;
            console.log(error);
            return result;
        }

        result.isSucceed = serverResponse.status === 200;
        if (result.isSucceed) {
            serverResponse.data.map(schedule => {
                    schedule.sendTime = getLocalDateTime(schedule.sendTime);
                    result.result.push(schedule);
                }
            );
        } else if (serverResponse.status === 401) {
            http_client.ClearAuth();
        }
        return result;
    }
};
export const GetSchedule = async (id) => {
    if (http_client.CheckAuth() === true && id != null) {
        let serverResponse;
        let result = Object.create(response);

        try {
            serverResponse = await http_client.client.get("/schedules/" + id);
        } catch (error) {
            result.isSucceed = false;
            console.log(error);
            return result;
        }

        result.isSucceed = serverResponse.status === 200;
        if (result.isSucceed) {
            result.result = serverResponse.data;
            result.result.sendTime = getLocalDateTime(result.result.sendTime);
        } else if (serverResponse.status === 401) {
            http_client.ClearAuth();
        }
        return result;
    }
};

export const DeleteSchedule = async (id) => {
    if (http_client.CheckAuth() === true && id != null) {
        let serverResponse;
        let result = Object.create(response);

        try {
            serverResponse = await http_client.client.delete("/schedules/" + id);
        } catch {
            result.isSucceed = false;
            return result;
        }

        result.isSucceed = serverResponse.status === 200;
        if (serverResponse.status === 401) {
            http_client.ClearAuth();
        }
        return result;
    }
};

export const UpdateSchedule = async (id, subject, body, sendTo, sendTime) => {
    if (http_client.CheckAuth() === true && id != null) {
        let newSchedule = {
            id: id,
            subject: subject,
            body: body,
            sendTo: sendTo,
            sendTime: sendTime,
        };
        let serverResponse;
        let result = Object.create(response);

        try {
            serverResponse = await http_client.client.put("/schedules", newSchedule);
        } catch (error) {
            result.isSucceed = false;
            console.log(error);
            return result;
        }

        result.isSucceed = serverResponse.status === 200;
        if (serverResponse.status === 401) {
            http_client.ClearAuth();
        }
        return result;
    }
};
