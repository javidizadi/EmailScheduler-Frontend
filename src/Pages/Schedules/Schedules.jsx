import React, {useContext, useEffect, useState} from "react";
import {GetSchedule, GetSchedules} from "../../Services/SchedulesManager";
import {Link} from "react-router-dom";
import {ScheduleContext} from "../../Contexts/ScheduleContext";
import {useNavigate} from "react-router";
import ScheduleRow from "./ScheduleRow";
import LoadingContext from "../../Contexts/LoadingContext";

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const loadingContext = useContext(LoadingContext);
    const scheduleContext = useContext(ScheduleContext);

    const navigate = useNavigate();



    useEffect(() => {

        loadingContext.setIsLoading(true);

        GetSchedules().then(response => {

            loadingContext.setIsLoading(false);

            setIsEmpty(!response.isSucceed);

            if (response.isSucceed) {
                setSchedules(response.result);
            } else {
                alert("Error in Get Data From Server.");
            }
        });

    }, []);



    const handleClickRefresh = async () => {

        loadingContext.setIsLoading(true);

        let response = await GetSchedules();

        loadingContext.setIsLoading(false);

        if (response.isSucceed) {
            setSchedules(response.result);
        } else {
            setIsEmpty(true);
            alert("Error in Get Data From Server.");
        }
    }

    const handleClickDetails = async (id) => {
        loadingContext.setIsLoading(true);

        const result = await GetSchedule(id);

        loadingContext.setIsLoading(false);

        if (result.isSucceed) {
            scheduleContext.setSchedule(result.result);
            navigate("/schedule-details");
        }
    }
    const handleClickEdit = async (id) => {
        loadingContext.setIsLoading(true);
        const result = await GetSchedule(id);
        loadingContext.setIsLoading(false);

        if (result.isSucceed) {
            scheduleContext.setSchedule(result.result);
            navigate("/edit-schedule");
        }
    }
    const handleClickDelete = async (id) => {
        loadingContext.setIsLoading(true);
        const result = await GetSchedule(id);
        loadingContext.setIsLoading(false);

        if (result.isSucceed) {
            scheduleContext.setSchedule(result.result);
            navigate("/delete-schedule");
        }
    }

    return (<div>
        <div className="mb-2 mt-8">
            <Link to="/add-schedule" className="btn btn-sm btn-circle btn-ghost mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                     fill="#FFFFFF">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            </Link>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={handleClickRefresh}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                     fill="#FFFFFF">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path
                        d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
            </button>
        </div>
        {isEmpty ? <div className="hero min-h-screen bg-base-200 w-3/4 rounded-box">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold">
                            There is nothing here
                        </h1>
                    </div>
                </div>
            </div>
            :
            <div className="overflow-x-auto w-3/4">

                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules.map((schedule) => (
                        <ScheduleRow
                            key={schedule.id}
                            id={schedule.id}
                            sendTo={schedule.sendTo}
                            subject={schedule.title}
                            date={schedule.sendTime.split('T')[0]}
                            time={schedule.sendTime.split('T')[1].replace(":00", "")}
                            handleClickDetails={handleClickDetails}
                            handleClickEdit={handleClickEdit}
                            handleClickDelete={handleClickDelete}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        }

    </div>);

}
export default Schedules;