import React from "react";

const ScheduleRow = ({id, sendTo, subject, date, time, handleClickDetails, handleClickEdit, handleClickDelete}) => {

    const clickDetails = async () => {
        await handleClickDetails(id);
    }

    const clickEdit = async () => {
        await handleClickEdit(id);
    }

    const clickDelete = async () => {
        await handleClickDelete(id);
    }

    return (<tr key={id}>
        <td>{id}</td>
        <td>{sendTo}</td>
        <td>{subject}</td>
        <td>{date}</td>
        <td>{time}</td>
        <td>
            <button className="btn btn-sm btn-outline btn-accent align-middle"
                    onClick={clickDetails}>Details
            </button>

            <button className="btn btn-sm btn-circle btn-ghost align-middle ml-4"
                    onClick={clickEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                     width="24px"
                     fill="#FFFFFF">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
            </button>

            <button className="btn btn-sm btn-circle btn-ghost align-middle"
                    onClick={clickDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                     width="24px"
                     fill="#FFFFFF">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </button>

        </td>

    </tr>);
}
export default ScheduleRow;