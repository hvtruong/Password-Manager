import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../../features/users/userApiSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import $ from "jquery";
import styles from "./Form.module.css";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USER_REGEX = /^[a-zA-Z0-9._]{4,20}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const SignUp = () => {
    // Import add new user module from API slice
    const [addNewUser, { isSuccess, reset }] = useAddNewUserMutation();

    // Hooks to control the signup form
    const [emailAddress, setEmailAddress] = useState("");
    const [validEmailAddress, setValidEmailAddress] = useState(false);

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const [repeatPassword, setRepeatPassword] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    // Validate email address, username, and password every time it changes
    useEffect(() => {
        setValidEmailAddress(EMAIL_REGEX.test(emailAddress));
    }, [emailAddress]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    // Reset input fields to empty when successfully submitted
    useEffect(() => {
        if (isSuccess) {
            setEmailAddress("");
            setUsername("");
            setPassword("");
            setRepeatPassword("");
            navigate("/");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        setErrMsg("");
    }, [emailAddress, username, password, repeatPassword]);

    // Update the view of input fields after reset
    const onEmailAddressChanged = (e) => setEmailAddress(e.target.value);
    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onRepeatPasswordChanged = (e) => setRepeatPassword(e.target.value);

    // Call the POST API to create new user when everything is valid
    const createNewUser = async (e) => {
        e.preventDefault();
        if (!validEmailAddress) {
            setErrMsg("Invalid email address");
        } else if (!validUsername) {
            setErrMsg("Invalid username");
        } else if (!validPassword) {
            setErrMsg("Invalid password");
        } else if (password !== repeatPassword) {
            setErrMsg("Passwords do not match");
        } else {
            try {
                await addNewUser({ username, password, emailAddress });
                $("#cancelButton").trigger("click");
            } catch (err) {
                console.log(err);
                if (typeof err.status != "number") {
                    setErrMsg("No Server Response");
                } else {
                    setErrMsg(err.data?.message);
                }
            }
        }
    };

    let content;
    if (isSuccess) {
        content = (
            <div>
                <p>
                    You have successfully signed up. Please check your email to
                    validate your account!
                </p>
                <Button onClick={reset}>
                    Sign up again!
                </Button>
            </div>
        );
    } else {
        content = (
            <div>
                <div className="modal-body">
                    <p className="text-white">
                        Please fill in the fields to register!
                    </p>

                    <input
                        type="email"
                        name="emailAddress"
                        placeholder="Email address"
                        value={emailAddress}
                        onChange={onEmailAddressChanged}
                        required
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={onUsernameChanged}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onPasswordChanged}
                        required
                    />

                    <input
                        type="password"
                        name="repeatPassword"
                        placeholder="Confirm password"
                        value={repeatPassword}
                        onChange={onRepeatPasswordChanged}
                        required
                    />
                </div>

                <p style={{ color: "#ff0000" }} aria-live="assertive">
                    {errMsg}
                </p>

                <div className="modal-footer">
                    <input type="submit" value="Create" />
                </div>
            </div>
        );
    }

    return (
        <div
            className="modal fade"
            id="signupForm"
            tabIndex="-1"
            labelled="signupForm"
        >
            <div className="modal-dialog modal-content">
                <form className="needs-validation" onSubmit={createNewUser}>
                    <div className={styles.box}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center">
                                Signup
                            </h1>
                            <button
                                type="button"
                                id="cancelButton"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        {content}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
