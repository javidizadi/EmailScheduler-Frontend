import { client, CheckAuth, ClearAuth, response } from "./http-client";

export const AddSchedule = async (subject, body, sendTo, sendTime) => {
  if (CheckAuth() === true) {
    let schedule = {
      subject: subject,
      body: body,
      sendTo: sendTo,
      sendTime: sendTime,
    };
    let serverResponse;
    let result = Object.create(response);

    try {
      serverResponse = await client.post("/schedules", schedule);
    } catch (error) {
      result.isSucceed = false;
      console.log(error);
      return result;
    }

    result.isSucceed = serverResponse.status === 200;
    if (serverResponse.status === 401) {
      ClearAuth();
    }

    return result;
  }
};

export const GetSchedules = async () => {
  if (CheckAuth() === true) {
    let serverResponse;
    let result = Object.create(response);

    try {
      serverResponse = await client.get("/schedules");
    } catch (error) {
      result.isSucceed = false;
      console.log(error);
      return result;
    }

    result.isSucceed = serverResponse.status === 200;
    if (result.isSucceed) {
      result.result = serverResponse.data;
    } else if (serverResponse.status === 401) {
      ClearAuth();
    }
    return result;
  }
};
export const GetSchedule = async (id) => {
  if (CheckAuth() === true && id != null) {
    let serverResponse;
    let result = Object.create(response);

    try {
      serverResponse = await client.get("/schedules/" + id);
    } catch (error) {
      result.isSucceed = false;
      console.log(error);
      return result;
    }

    result.isSucceed = serverResponse.status === 200;
    if (result.isSucceed) {
      result.result = serverResponse.data;
    } else if (serverResponse.status === 401) {
      ClearAuth();
    }
    return result;
  }
};

export const DeleteSchedule = async (id) => {
  if (CheckAuth() === true && id != null) {
    let serverResponse;
    let result = Object.create(response);

    try {
      serverResponse = await client.delete("/schedules/" + id);
    } catch {
      result.isSucceed = false;
      return result;
    }

    result.isSucceed = serverResponse.status === 200;
    if (serverResponse.status === 401) {
      ClearAuth();
    }
    return result;
  }
};

export const UpdateSchedule = async (id, subject, body, sendTo, sendTime) => {
  if (CheckAuth() === true && id != null) {
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
      serverResponse = await client.put("/schedules", newSchedule);
    } catch (error) {
      result.isSucceed = false;
      console.log(error);
      return result;
    }

    result.isSucceed = serverResponse.status === 200;
    if (serverResponse.status === 401) {
      ClearAuth();
    }
    return result;
  }
};
