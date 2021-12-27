import React, {useContext} from "react";
import {Login as sendLogin} from "../../Services/AccountManager";
import {UserContext} from "../../Contexts/UserContext";
import {useNavigate} from "react-router";
import LoadingContext from "../../Contexts/LoadingContext";

const Login = () => {
        const userContext = useContext(UserContext);
        const loadingContext = useContext(LoadingContext);
        const navigate = useNavigate();

        const handleSubmit = async (event) => {

            event.preventDefault();

            loadingContext.setIsLoading(true);

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const result = await sendLogin(email, password);

            loadingContext.setIsLoading(false);

            if (result.isSucceed) {
                userContext.setUser({
                    isLoggedIn: true,
                    username: email
                });

                navigate("/");
            } else {
                alert("Error:\n" + result.result);
            }

        };

        return (
            <div className="mt-4">
                <form className="card-body bg-gray-600 shadow-lg rounded-box w-96" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Email"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control mt-5">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control mt-8">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Login"
                        />
                    </div>
                </form>
            </div>
        );
    }
;

export default Login;
