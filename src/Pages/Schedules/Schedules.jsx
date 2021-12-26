import React, {useEffect, useState} from "react";
import {GetSchedules} from "../../Services/SchedulesManager";

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        GetSchedules().then(response => {
            if (response.isSucceed) {
                setSchedules(response.result);
            } else {
                setIsEmpty(true);
                alert("Error in Get Data From Server.");
            }
        });
    }, []);

    const handleClickRefresh = async () => {
        let response = await GetSchedules();
        if (response.isSucceed) {
            setSchedules(response.result);
        } else {
            setIsEmpty(true);
            alert("Error in Get Data From Server.");
        }
    }

    const handleClickDetails = (event) => {
        // ToDo: Complete When Routing init
    }

    const handleClickEdit = (event) => {
        // ToDo: Complete When Routing init
    }

    const handleClickDelete = (event) => {
        // ToDo: Complete When Routing init
    }

    return (<div>
        <div className="mb-2 mt-8">
            <button className="btn btn-sm btn-circle btn-ghost mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                     fill="#FFFFFF">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            </button>
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
                        <tr key={schedule.id}>
                            <td>{schedule.id}</td>
                            <td>{schedule.sendTo}</td>
                            <td>{schedule.subject}</td>
                            <td>{schedule.sendTime.split('T')[0]}</td>
                            <td>{schedule.sendTime.split('T')[1].replace(":00", "")}</td>
                            <td>
                                <button className="btn btn-sm btn-outline btn-accent align-middle"
                                        onClick={handleClickDetails}>Details
                                </button>

                                <button className="btn btn-sm btn-circle btn-ghost align-middle ml-4"
                                        onClick={handleClickEdit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                                         width="24px"
                                         fill="#FFFFFF">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                    </svg>
                                </button>

                                <button className="btn btn-sm btn-circle btn-ghost align-middle"
                                        onClick={handleClickDelete}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                                         width="24px"
                                         fill="#FFFFFF">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                    </svg>
                                </button>

                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        }

    </div>);

}
export default Schedules;