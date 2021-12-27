import React from "react";

const Loading = () => {
    return (
        <div>
            <svg className="loading-container" xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink"
                 width="200px" height="200px"
                 viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <path className="loading-path"
                      fill="none" stroke="#570df8" strokeWidth="8" strokeDasharray="133.42624267578125 123.162685546875"
                      d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                      strokeLinecap="round">
                    <animate className="loading-animation" attributeName="stroke-dashoffset" repeatCount="indefinite"
                             dur="0.78125s" keyTimes="0;1"
                             values="0;256.58892822265625"/>
                </path>
            </svg>
        </div>
    );
}

export default Loading;