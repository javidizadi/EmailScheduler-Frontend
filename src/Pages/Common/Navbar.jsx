import {NavLink} from "react-router-dom";

function Navbar({IsLoggedIn, Username}) {

    let UserZone =
        <div>
            <div className="flex-none">
                <button className="btn">
                    <NavLink to="/login">Login</NavLink>
                </button>
            </div>
            <div className="flex-none">
                <button className="btn">
                    <NavLink to="/signup">SignUp</NavLink>
                </button>
            </div>
        </div>

    if (IsLoggedIn === true) {
        UserZone =
            <div>
                <div className="flex-none">
                    <button className="btn">
                        <a href="">{Username}</a>
                    </button>
                </div>
                <div className="flex-none">
                    <button className="btn">
                        <a href="">Logout</a>
                    </button>
                </div>
            </div>
    }

    return (
        <div>
            <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
                <div className="flex-none px-2 mx-2">
                    <span className="text-lg font-bold">Email Scheduler</span>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <div className="items-stretch hidden lg:flex">
                        <NavLink to="/" className="btn btn-ghost btn-sm rounded-btn">Home</NavLink>
                        {IsLoggedIn ? <NavLink to="/schedules" className="btn btn-ghost btn-sm rounded-btn">Schedules</NavLink> : null}
                        <NavLink to="/contact" className="btn btn-ghost btn-sm rounded-btn">Contact Me</NavLink>
                    </div>
                </div>
                {UserZone}
            </div>
        </div>
    );
}

export default Navbar;
