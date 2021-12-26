import React, {useContext, useState} from "react";
import validator from "validator/es";
import {Register as sendRegister} from "../../Services/AccountManager";
import {UserContext} from "../../Contexts/UserContext";

const SignUp = () => {

    const [emailValid, setEmailValid] = useState(false);

    const userContext = useContext(UserContext);

    const handleValidationEmail = (event) => {
        setEmailValid(validator.isEmail(event.target.value));
    };

    const [passwordValid, setPasswordValid] = useState(false);

    const handleValidationPassword = (event) => {
        setPasswordValid(validator.isStrongPassword(event.target.value));
    };

    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleMatchPasswords = (event) => {
        setPasswordMatch(event.target.value === document.getElementById("password").value);
    }

    const handleSubmit = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (emailValid && passwordValid && passwordMatch) {
            const result = await sendRegister(email, password);
            if (result.isSucceed) {
                userContext.setUser({
                    isLoggedIn: true,
                    username: email
                });
                // ToDo : completed When Routing is initialized
            } else {
                alert(result.result);
            }
        }
    };

    return <div className="mt-4">
        <div className="card-body bg-gray-600 shadow-lg rounded-box w-96">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input id="email" type="text" placeholder="Email" className="input input-bordered"
                       onChange={handleValidationEmail}/>
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
                <input id="password" type="password" placeholder="Password" onChange={handleValidationPassword}
                       className="input input-bordered"/>
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
            <div className="form-control mt-5">
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="Confirm Password" className="input input-bordered"
                       onChange={handleMatchPasswords}/>
                {passwordMatch ? null : (
                    <label className="label">
              <span className="label-text-alt text-red-400">
                Passwords Dont Match.
              </span>
                    </label>
                )}
            </div>
            <div className="form-control mt-8">
                <button onClick={handleSubmit} className="btn btn-primary">
                    Register
                </button>
            </div>

        </div>
    </div>
}
export default SignUp;