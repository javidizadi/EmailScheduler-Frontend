import {Route, Routes} from "react-router";

import Navbar from "./Pages/Common/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Schedules from "./Pages/Schedules/Schedules";
import ContactMe from "./Pages/ContactMe/ContactMe";


function App() {

    return (
        <div className="App">
            <div className="mb-4">
                <Navbar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contact" element={<ContactMe/>}/>
                <Route path="/schedules" element={<Schedules/>}/>
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
            </Routes>
        </div>
    );


}

export default App
