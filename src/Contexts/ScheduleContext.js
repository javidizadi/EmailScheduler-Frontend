import {createContext} from "react";

export const ScheduleContext = createContext({
    schedule: {},
    setSchedule: (schedule) => {}
});