import React, {useState} from "react";
import validator from "validator/es";
import {useNavigate} from "react-router";

const AddSchedule = () => {

    const initState = {
        subject: "",
        sendTo: "",
        sendDate: "2021-01-01",
        sendTime: "00:00",
        body: ""
    }

    const today = new Date();

    const [schedule, setSchedule] = useState(initState);

    const [textValid, setTextValid] = useState(false);

    const [emailValid, setEmailValid] = useState(false);

    const [dateValid, setDateValid] = useState(false);

    const [timeValid, setTimeValid] = useState(false);

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
        const value = event.target.value;

        setTextValid(value !== "");

        let current = {...schedule};
        current.body = event.target.value;
        setSchedule(current);
    }


    const handleSubmit = () => {
        if (emailValid && dateValid && timeValid) {
            // ToDo: Send Data to Server
            navigate("/");
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
                {textValid ? null : (
                    <label className="label">
              <span className="label-text-alt text-red-400">
                Text is Required.
              </span>
                    </label>
                )}
            </div>

            <div className="form-control mt-6">
                <input type="submit" onSubmit={handleSubmit} className="btn btn-primary" value="Submit"/>
            </div>
        </div>
    </div>);
}

export default AddSchedule;