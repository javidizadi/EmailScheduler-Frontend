import React, {useContext, useState} from "react";
import validator from "validator/es";
import {useNavigate} from "react-router";
import {AddSchedule as sendSchedule} from "../../Services/SchedulesManager";
import LoadingContext from "../../Contexts/LoadingContext";

const AddSchedule = () => {

    const initState = {
        subject: "",
        sendTo: "",
        sendDate: "2021-01-01",
        sendTime: "00:00",
        body: ""
    }

    const [schedule, setSchedule] = useState(initState);

    const [textValid, setTextValid] = useState(false);

    const [emailValid, setEmailValid] = useState(false);

    const [dateValid, setDateValid] = useState(false);

    const [timeValid, setTimeValid] = useState(false);

    const loadingContext = useContext(LoadingContext);

    const navigate = useNavigate();

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

        let today_date = new Date();
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

        const today = new Date();

        setTimeValid(date >= today);

        let current = {...schedule};
        current.sendTime = value;
        setSchedule(current);
    }

    const handleChangingText = (event) => {
        const value = event.target.value;

        setTextValid(value !== "");

        let current = {...schedule};
        current.body = event.target.value;
        setSchedule(current);
    }


    const handleSubmit = async () => {
        if (emailValid && dateValid && timeValid) {

            loadingContext.setIsLoading(true);

            const date = new Date(`${schedule.sendDate}T${schedule.sendTime}:00`);
            const sendTime = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}T${date.getUTCHours()}:${date.getUTCMinutes()}:00`;

            const requestBody = {
                title: schedule.subject,
                sendTo: schedule.sendTo,
                sendTime: sendTime,
                body: schedule.body,
            };

            const result = await sendSchedule(requestBody.title, requestBody.body, requestBody.sendTo, requestBody.sendTime);

            loadingContext.setIsLoading(false);

            if (result.isSucceed) {
                navigate("/schedules");
            } else {
                alert("Error:\n" + result.result);
            }

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
                {textValid ? null : (
                    <label className="label">
              <span className="label-text-alt text-red-400">
                Text is Required.
              </span>
                    </label>
                )}
            </div>

            <div className="form-control mt-6">
                <input type="submit" onClick={handleSubmit} className="btn btn-primary" value="Submit"/>
            </div>
        </div>
    </div>);
}

export default AddSchedule;