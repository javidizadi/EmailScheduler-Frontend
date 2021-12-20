import React from "react";

const Home = ({IsLoggedIn}) => {
    return <div>
        <div className="hero mt-4 min-h-screen bg-base-200 rounded-box">

            <img className="rounded-box opacity-25" src="../../../public/clock.jpg" alt=""/>

            <div className="text-center hero-content">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl font-bold">
                        Email Scheduler
                    </h1>

                    <p className="mb-5 text-lg">
                        Schedule Your Emails from 5 Seconds to 5 Years later.
                    </p>

                    {
                        IsLoggedIn ?
                            <button className="btn btn-primary btn-lg">Schedules</button> :
                            <button className="btn btn-primary btn-lg">Get Started</button>
                    }

                </div>
            </div>

        </div>
    </div>
}

export default Home;