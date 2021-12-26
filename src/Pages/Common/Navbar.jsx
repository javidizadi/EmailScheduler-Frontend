import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../Contexts/UserContext";

function Navbar() {

    const userContext = useContext(UserContext);

    const handleLogout = () => {
        userContext.setUser({
            isLoggedIn: false,
            username: ""
        })
        // ToDo : Redirect to Home Page
    }

    let UserZone =
        <div>
            <div className="flex-none">
                <Link to="/login" className="btn">Login</Link>
            </div>
            <div className="flex-none">
                <Link to="/signup" className="btn">SignUp</Link>
            </div>
        </div>

    if (userContext.isLoggedIn === true) {
        UserZone =
            <div>
                <div className="flex-none">
                    <div className="dropdown">
                        <div tabIndex="0" className="m-1 btn">{userContext.username}</div>
                        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/password" className="btn btn-ghost">Change Password</Link>
                            </li>
                            <li>
                                <div className="btn btn-ghost" onClick={handleLogout}>Logout</div>
                            </li>
                        </ul>
                    </div>
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
                        <Link to="/" className="btn btn-ghost btn-sm rounded-btn">Home</Link>
                        {userContext.isLoggedIn ? <Link to="/schedules"
                                                        className="btn btn-ghost btn-sm rounded-btn">Schedules</Link> : null}
                        <Link to="/contact" className="btn btn-ghost btn-sm rounded-btn">Contact Me</Link>
                    </div>
                </div>
                {UserZone}
            </div>
        </div>
    );
}

export default Navbar;
