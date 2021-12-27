import {Route, Routes} from "react-router";

import Navbar from "./Pages/Common/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Schedules from "./Pages/Schedules/Schedules";
import ContactMe from "./Pages/ContactMe/ContactMe";
import {UserContext} from "./Contexts/UserContext";
import {useState} from "react";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import AddSchedule from "./Pages/AddSchedule/AddSchedule";
import EditSchedule from "./Pages/EditSchedule/EditSchedule";
import {ScheduleContext} from "./Contexts/ScheduleContext";
import ScheduleDetails from "./Pages/ScheduleDetails/ScheduleDetails";
import DeleteSchedule from "./Pages/DeleteSchedule/DeleteSchedule";
import LoadingContext from "./Contexts/LoadingContext";
import Loading from "./Pages/Common/Loding";


function App() {

    const [user, setUser] = useState({
        isLoggedIn: false,
        username: ""
    });

    const [schedule, setSchedule] = useState({
        id: null,
        title: "",
        sendTo: "",
        sendTime: "",
        text: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="App">
            <LoadingContext.Provider value={{isLoading: isLoading, setIsLoading: setIsLoading}}>
                <UserContext.Provider
                    value={{isLoggedIn: user.isLoggedIn, username: user.username, setUser: setUser}}>

                    <ScheduleContext.Provider value={{schedule: schedule, setSchedule: setSchedule}}>
                        {isLoading ? <Loading/> : null}
                        <div hidden={isLoading}>
                            <div className="mb-4">
                                <Navbar/>
                            </div>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/contact" element={<ContactMe/>}/>
                                <Route path="/login" element={
                                    <div className="flex justify-center mt-24">
                                        <Login/>
                                    </div>
                                }/>
                                <Route path="/signup" element={
                                    <div className="flex justify-center mt-24">
                                        <SignUp/>
                                    </div>
                                }/>
                                <Route path="/password" element={
                                    <div className="flex justify-center mt-24">
                                        <ChangePassword/>
                                    </div>
                                }/>

                                <Route path="/schedules" element={<Schedules/>}/>
                                <Route path="/add-schedule" element={
                                    <div className="flex justify-center mt-24">
                                        <AddSchedule/>
                                    </div>
                                }/>
                                <Route path="/edit-schedule" element={
                                    <div className="flex justify-center mt-24">
                                        <EditSchedule/>
                                    </div>
                                }/>
                                <Route path="/schedule-details" element={
                                    <div className="flex justify-center mt-24">
                                        <ScheduleDetails/>
                                    </div>
                                }/>
                                <Route path="/delete-schedule" element={
                                    <div className="flex justify-center mt-24">
                                        <DeleteSchedule/>
                                    </div>
                                }/>
                            </Routes>
                        </div>

                    </ScheduleContext.Provider>
                </UserContext.Provider>
            </LoadingContext.Provider>
        </div>
    );


}

export default App
