import { useState, useEffect } from "react";
import { useAddNewPasswordMutation } from "../../features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import $ from "jquery";
import styles from "./Form.module.css";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const NewPasswordForm = () => {
    const navigate = useNavigate();

    // Import add new user module from API slice
    const [addNewPassword, { isSuccess }] = useAddNewPasswordMutation();

    const { id } = useAuth();

    // Hooks to control the new password form
    const [newWebsite, setNewWebsite] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [validNewPassword, setValidNewPassword] = useState(false);

    const [repeatNewPassword, setRepeatNewPassword] = useState("");

    const [errMsg, setErrMsg] = useState("");

    // Validate password every time it changes
    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(newPassword));
    }, [newPassword]);

    // Reset input fields to empty when successfully submitted
    useEffect(() => {
        if (isSuccess) {
            setNewWebsite("");
            setNewPassword("");
            setRepeatNewPassword("");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        setErrMsg("");
    }, [newWebsite, newPassword, repeatNewPassword]);

    // Update the view of input fields after reset
    const onNewWebsiteChanged = (e) => setNewWebsite(e.target.value);
    const onNewPasswordChanged = (e) => setNewPassword(e.target.value);
    const onRepeatNewPasswordChanged = (e) =>
        setRepeatNewPassword(e.target.value);

    // Call the POST API to create new user when everything is valid
    const createNewPassword = async (e) => {
        e.preventDefault();
        if (!validNewPassword) {
            setErrMsg("Invalid new password");
        } else if (newPassword !== repeatNewPassword) {
            setErrMsg("Passwords do not match");
        } else {
            try {
                const response = await addNewPassword({
                    id,
                    newWebsite,
                    password: newPassword,
                });
                if (response.error) {
                    if (typeof response.error.status != "number") {
                        setErrMsg("No Server Response");
                    } else {
                        setErrMsg(response.error.data?.message);
                    }
                } else {
                    console.log("Closing");
                    $("#closeFormButton").trigger("click");
                }
            } catch (error) {
                console.log("An error occurred: ", error);
            }
        }
    };

    return (
        <div
            className="modal fade"
            id="newPasswordForm"
            tabIndex="-1"
            labelled="newPasswordForm"
        >
            <div className="modal-dialog modal-content">
                <form className="needs-validation" onSubmit={createNewPassword}>
                    <div className={styles.box}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center">
                                Create new password
                            </h1>

                            <button
                                type="button"
                                id="closeFormButton"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <div className="modal-body">
                            <p className="text-white">
                                Please fill in the fields to update your
                                password!
                            </p>

                            <input
                                type="text"
                                name="newWebsite"
                                placeholder="Password name"
                                value={newWebsite}
                                onChange={onNewWebsiteChanged}
                                required
                            />

                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New password"
                                value={newPassword}
                                onChange={onNewPasswordChanged}
                                required
                            />

                            <input
                                type="password"
                                name="repeatNewPassword"
                                placeholder="Confirm new password"
                                value={repeatNewPassword}
                                onChange={onRepeatNewPasswordChanged}
                                required
                            />
                        </div>

                        <p style={{ color: "#ff0000" }} aria-live="assertive">
                            {errMsg}
                        </p>

                        <div className="modal-footer">
                            <input type="submit" name="" value="Create" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordForm;
