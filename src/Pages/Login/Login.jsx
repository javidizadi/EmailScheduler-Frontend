import React, {useState} from "react";
import {Login as sendLogin} from "../../Services/AccountManager";

const Login = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;

    const [emailValid, setEmailValid] = useState(true);

    const handleValidationEmail = (event) => {
        setEmailValid(event.target.value.match(emailRegex) != null);
    };

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    const [passwordValid, setPasswordValid] = useState(true);

    const handleValidationPassword = (event) => {
        setPasswordValid(event.target.value.match(passwordRegex) != null);
    };

    const handleSubmit = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email === "" && password === "") {
            setEmailValid(false);
            setPasswordValid(false);
            return;
        }

        if (emailValid && passwordValid) {
            const result = await sendLogin(email, password);
            if (result.isSucceed) {
                // ToDo : completed When Routing is initialized
            } else {
                alert(result.result);
            }
        }
    };

    return (
        <div className="mt-4">
            <div className="card-body bg-gray-600 shadow-lg rounded-box w-96">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        className="input input-bordered"
                        onChange={handleValidationEmail}
                    />
                    {emailValid ? null : (
                        <label className="label">
              <span className="label-text-alt text-red-400">
                Please Enter Valid Email
              </span>
                        </label>
                    )}
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
                        onChange={handleValidationPassword}
                    />
                    {passwordValid ? null : (
                        <label className="label">
                            <ul>
                                <li className="label-text">Your Password Must:</li>
                                <li className="label-text-alt text-red-400">
                                    Contains Alphabet
                                </li>
                                <li className="label-text-alt text-red-400">
                                    Contains Capital Alphabet
                                </li>
                                <li className="label-text-alt text-red-400">
                                    Contains Number
                                </li>
                                <li className="label-text-alt text-red-400">
                                    At least 8 Characters
                                </li>
                            </ul>
                        </label>
                    )}
                </div>
                <div className="form-control mt-8">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
