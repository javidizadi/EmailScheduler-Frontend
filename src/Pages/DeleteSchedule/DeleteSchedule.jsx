import React, {useContext} from "react";
import {ScheduleContext} from "../../Contexts/ScheduleContext";
import {DeleteSchedule as deleteRequest} from "../../Services/SchedulesManager";
import {useNavigate} from "react-router";

const DeleteSchedule = () => {

    const scheduleContext = useContext(ScheduleContext).schedule;
    const navigate = useNavigate();

    const handleRemove = async () => {
        await deleteRequest(scheduleContext.id);
        navigate("/schedules");
    }

    return (<div className="card-body bg-gray-600 shadow-lg rounded-box w-12">
            <div>
                <p>Delete {scheduleContext.title}?</p>
            </div>
            <div className="flex justify-center mt-4">
                <button className="btn btn-accent mr-8" onClick={handleRemove}>Yes</button>
                <button className="btn btn-secondary" onClick={() => {
                    navigate("/schedules")
                }}>No
                </button>
            </div>
    </div>);
}

export default DeleteSchedule;