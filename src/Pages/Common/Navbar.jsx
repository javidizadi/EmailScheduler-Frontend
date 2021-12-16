function Navbar({IsLoggedIn, Username}) {

    let UserZone =
        <div>
            <div className="flex-none">
                <button className="btn">
                    <a href="">Login</a>
                </button>
            </div>
            <div className="flex-none">
                <button className="btn">
                    <a href="">SignUp</a>
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
                        <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
                        {IsLoggedIn ? <a className="btn btn-ghost btn-sm rounded-btn">Schedules</a> : null}
                        <a className="btn btn-ghost btn-sm rounded-btn">About</a>
                        <a className="btn btn-ghost btn-sm rounded-btn">Contact</a>
                    </div>
                </div>
                {UserZone}
            </div>
        </div>
    );
}

export default Navbar;
