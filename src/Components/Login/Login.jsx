import React from "react";

const Login = () => {
    return <div className="mt-4">
        <div className="card-body bg-gray-600 shadow-lg rounded-box w-96">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="Email" className="input input-bordered"/>
            </div>
            <div className="form-control mt-5">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" className="input input-bordered"/>
            </div>
            <div className="form-control mt-8">
                <button className="btn btn-primary">
                    Login
                </button>
            </div>

        </div>
</div>
}

export default Login;