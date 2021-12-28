import React, {useContext, useState} from "react";
import validator from "validator/es";
import {ScheduleContext} from "../../Contexts/ScheduleContext";
import {UpdateSchedule} from "../../Services/SchedulesManager";
import {useNavigate} from "react-router";
import LoadingContext from "../../Contexts/LoadingContext";

const EditSchedule = () => {

    const currentSchedule = useContext(ScheduleContext).schedule;
    const loadingContext = useContext(LoadingContext);

    const initState = {
        id: currentSchedule.id,
        subject: currentSchedule.title,
        sendTo: currentSchedule.sendTo,
        sendDate: currentSchedule.sendTime.split('T')[0],
        sendTime: currentSchedule.sendTime.split('T')[1],
        body: currentSchedule.text
    }

    const today = new Date();

    const [schedule, setSchedule] = useState(initState);

    const [emailValid, setEmailValid] = useState(true);

    const [dateValid, setDateValid] = useState(true);

    const [timeValid, setTimeValid] = useState(true);

    const navigate = useNavigate();

    const getUTCDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        const local_year = date.getUTCFullYear();
        const local_month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const local_day = date.getUTCDate().toString().padStart(2, '0');
        const local_hour = date.getUTCHours().toString().padStart(2, '0');
        const local_minutes = date.getUTCMinutes().toString().padStart(2, '0');

        return `${local_year}-${local_month}-${local_day}T${local_hour}:${local_minutes}:00`;
    }

    const handleChangingSubject = (event) => {

        let current = {...schedule};

        current.subject = event.target.value;

        setSchedule(current);

    }

    const handleChangingSendTo = (event) => {
        const value = event.target.value;

        setEmailValid(validator.isEmail(value));

        let current = {...schedule};

        current.sendTo = value;

        setSchedule(current);
    }

    const handleChangingSendDate = (event) => {

        const value = event.target.value;

        const date = new Date(value);

        const today_date = {...today};
        today_date.setHours(0, 0, 0, 0);

        setDateValid(date >= today_date);

        let current = {...schedule};
        current.sendDate = value;
        setSchedule(current);
    }

    const handleChangingSendTime = (event) => {

        const value = event.target.value;

        const [hour, min] = value.split(":");

        const date = new Date(schedule.sendDate);
        date.setHours(hour, min);

        setTimeValid(date >= today);

        let current = {...schedule};
        current.sendTime = value;
        setSchedule(current);
    }

    const handleChangingText = (event) => {
        let current = {...schedule};
        current.body = event.target.value;
        setSchedule(current);
    }


    const handleSubmit = async () => {

        if (emailValid && dateValid && timeValid) {

            loadingContext.setIsLoading(true);

            const sendTime = getUTCDateTime(`${schedule.sendDate}T${schedule.sendTime}:00`);

            const requestBody = {
                id: schedule.id,
                title: schedule.subject,
                sendTo: schedule.sendTo,
                sendTime: sendTime,
                body: schedule.body,
            };
            const result =
                await UpdateSchedule(
                    requestBody.id,
                    requestBody.title,
                    requestBody.body,
                    requestBody.sendTo,
                    requestBody.sendTime);

            loadingContext.setIsLoading(false);

            if (result.isSucceed) {
                navigate("/schedules");
            } else {
                alert("Error");
            }

        } else {

        }
    }

    return (<div>
        <div className="card p-10 bg-gray-600 w-96">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Subject</span>
                </label>
                <input id="txt_subject" type="text" className="input input-bordered text-center"
                       value={schedule.subject}
                       onChange={handleChangingSubject}
                />
            </div>
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Send To</span>
                </label>
                <input type="text" className="input input-bordered text-center"
                       onChange={handleChangingSendTo}
                       value={schedule.sendTo}/>
                {emailValid ? null : (
                    <label className="label">
              <span className="label-text-alt text-red-400">
                Please Enter Valid Email
              </span>
                    </label>
                )}
            </div>
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Send Date</span>
                </label>
                <input type="date" className="input input-bordered text-center"
                       onChange={handleChangingSendDate}
                       value={schedule.sendDate}/>
                {dateValid ? null : (
                    <label className="label">
              <span className="label-text-alt text-red-400">
                Date Should be after today or equals today.
              </span>
                    </label>
                )}
            </div>
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Send Time</span>
                </label>
                <input type="time" className="input input-bordered text-center"
                       onChange={handleChangingSendTime}
                       value={schedule.sendTime}/>
                {timeValid ? null : (
                    <label className="label">
              <span className="label-text-alt text-red-400">
                Time Should be at least 1 minutes after now.
              </span>
                    </label>
                )}
            </div>


            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Text</span>
                </label>
                <textarea className="textarea h-24 textarea-bordered"
                          onChange={handleChangingText}
                          value={schedule.body}/>
            </div>

            <div className="form-control mt-6">
                <input type="submit" onClick={handleSubmit} className="btn btn-primary" value="Submit"/>
            </div>
        </div>
    </div>);
}

export default EditSchedule;