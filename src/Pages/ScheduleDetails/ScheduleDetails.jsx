import React, {useContext} from "react";
import {ScheduleContext} from "../../Contexts/ScheduleContext";

const ScheduleDetails = () => {

    const {schedule} = useContext(ScheduleContext);

    return (<div>
        <div className="card p-10 bg-gray-600 w-96">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Subject</span>
                </label>
                <input type="text" disabled="disabled" className="input input-bordered text-center "
                       value={schedule.title}/>
            </div>
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Send To</span>
                </label>
                <input type="text" disabled="disabled" className="input input-bordered text-center"
                       value={schedule.sendTo}/>
            </div>
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Send Date</span>
                </label>
                <input type="date" className="input input-bordered text-center" disabled="disabled"
                       value={schedule.sendTime.split("T")[0]}/>
            </div>
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Send Time</span>
                </label>
                <input type="time" className="input input-bordered text-center" disabled="disabled"
                       value={schedule.sendTime.split("T")[1].replace(":00","")}/>
            </div>

            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Text</span>
                </label>
                <textarea className="textarea h-24 textarea-bordered" disabled="disabled" value={schedule.text}/>
            </div>
        </div>
    </div>);

}

export default ScheduleDetails;