import { client, CheckAuth, ClearAuth } from "./http-client";

export const AddSchedule = async (subject, body, sendTo, sendTime) => {
  if (CheckAuth() === true) {
    let schedule = {
      subject: subject,
      body: body,
      sendTo: sendTo,
      sendTime: sendTime,
    };
    let response;
    try {
      response = await client.post("/schedules", schedule);
    } catch {
      return false;
    }
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      ClearAuth();
      return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const GetSchedules = async () => {
  if (CheckAuth() === true) {
    let response;
    try {
      response = await client.get("/schedules");
    } catch {
      return [];
    }
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      ClearAuth();
      return [];
    } else {
      console.log(response.status);
      return [];
    }
  } else {
    return [];
  }
};
export const GetSchedule = async (id) => {
  if (CheckAuth() === true && id != null) {
    let response;
    try {
      response = await client.get("/schedules/" + id);
    } catch {
      return {};
    }
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      ClearAuth();
      return {};
    } else {
      console.log(response.status);
      return {};
    }
  } else {
    return {};
  }
};

export const DeleteSchedule = async (id) => {
  if (CheckAuth() === true && id != null) {
    let response;
    try {
      response = await client.delete("/schedules/" + id);
    } catch {
      return false;
    }
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      ClearAuth();
      return false;
    } else {
      return false;
    }
  } else {
    return false;
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
    let response;
    try {
      response = await client.put("/schedules", newSchedule);
    } catch {
      return false;
    }
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      ClearAuth();
      return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
