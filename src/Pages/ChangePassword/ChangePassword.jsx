import React, {useState} from "react";
import validator from "validator/es";
import {ChangePassword as sendChangeRequest} from "../../Services/AccountManager";
import {useNavigate} from "react-router";

const ChangePassword = () => {

    const [passwordValid, setPasswordValid] = useState(false);

    const navigate = useNavigate();

    const handleValidationPassword = (event) => {
        setPasswordValid(validator.isStrongPassword(event.target.value));
    };

    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleMatchPasswords = (event) => {
        setPasswordMatch(event.target.value === document.getElementById("newPassword").value);
    }

    const handleSubmit = async () => {
        if (passwordValid && passwordMatch) {
            const currentPassword = document.getElementById("currentPassword").value;
            const newPassword = document.getElementById("newPassword").value;

            const result = await sendChangeRequest(currentPassword, newPassword);

            if (result.isSucceed) {
                alert("Your Password Changed!");
                navigate("/");
            } else {
                alert("Fault:\n" + result.result);
            }
        }
    }

    return (<div className="mt-4">
        <div className="card-body bg-gray-600 shadow-lg rounded-box w-96">
            <div className="form-control ">
                <label className="label">
                    <span className="label-text">Current Password</span>
                </label>
                <input id="currentPassword" type="password" placeholder="Current Password"
                       className="input input-bordered"/>

            </div>
            <div className="form-control mt-5">
                <label className="label">
                    <span className="label-text">New Password</span>
                </label>
                <input id="newPassword" type="password" placeholder="New Password" onChange={handleValidationPassword}
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Change
                </button>
            </div>

        </div>
    </div>);
}

export default ChangePassword;