import React from "react";

const ScheduleDetails = ({schedule}) => {

    return (<div>
        <div className="card p-10 bg-gray-600 w-96">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Subject</span>
                </label>
                <input type="text" disabled="disabled" className="input input-bordered text-center "
                       value={schedule.subject}/>
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
                    <span className="label-text">Send Time</span>
                </label>
                <input type="text" disabled="disabled" className="input input-bordered text-center"
                       value={schedule.sendTime}/>
            </div>

            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Text</span>
                </label>
                <textarea className="textarea h-24 textarea-bordered" disabled="disabled" value={schedule.body}/>
            </div>
        </div>
    </div>);

}

export default ScheduleDetails;