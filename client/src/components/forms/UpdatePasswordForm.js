import { useState, useEffect } from "react";
import { useUpdatePasswordMutation } from "../../features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { useCallback } from "react";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;
const UpdatePasswordForm = ({ info }) => {
    const navigate = useNavigate();
    // Import add new user module from API slice
    const [updatePassword, { isSuccess }] = useUpdatePasswordMutation();

    // Hooks to control the update password form
    const [formData, setFormData] = useState({
        newUsername: info.username,
        oldPassword: info.password,
        newPassword: "",
        repeatNewPassword: "",
    });
    const [validNewPassword, setValidNewPassword] = useState(false);

    const { newUsername, oldPassword, newPassword, repeatNewPassword } = formData;

    const [errMsg, setErrMsg] = useState("");

    const resetForm = useCallback(() => {
        setFormData({
            newUsername: info.username,
            oldPassword: info.password,
            newPassword: "",
            repeatNewPassword: "",
        });
    }, [info]);

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    // Validate password every time it changes
    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(newPassword));
    }, [newPassword]);

    // Reset input fields to empty when successfully submitted
    useEffect(() => {
        if (isSuccess) {
            resetForm();
        }
    }, [isSuccess, resetForm]);

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    // Update the view of input fields after reset
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Call the PUT API to create new user when everything is valid
    const createNewPassword = async (e) => {
        e.preventDefault();
        if (!validNewPassword) {
            setErrMsg("Invalid new password");
        } else if (newPassword !== repeatNewPassword) {
            setErrMsg("Passwords do not match");
        } else {
            try {
                const response = await updatePassword({
                    newUsername,
                    oldPassword,
                    newPassword,
                });
                if (response.error) {
                    if (typeof response.error.status != "number") {
                        setErrMsg("No Server Response");
                    } else {
                        setErrMsg(response.error.data?.message);
                    }
                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                console.log("An error occurred: ", error);
            }
        }
    };

    return (
        <div
            className="modal fade"
            id="updatePasswordForm"
            tabIndex="-1"
            labelled="updatePasswordForm"
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
                                id="closeButton"
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
                                name="newUsername"
                                placeholder="Username"
                                value={newUsername}
                                onChange={handleInputChange}
                                required
                            />

                            <input
                                type="text"
                                name="oldPassword"
                                placeholder="Old password"
                                value={oldPassword}
                                onChange={handleInputChange}
                                required
                            />

                            <input
                                type="text"
                                name="newPassword"
                                placeholder="New password"
                                value={newPassword}
                                onChange={handleInputChange}
                                required
                            />

                            <input
                                type="text"
                                name="repeatNewPassword"
                                placeholder="Confirm new password"
                                value={repeatNewPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <p style={{ color: "#ff0000" }} aria-live="assertive">
                            {errMsg}
                        </p>

                        <div className="modal-footer">
                            <input type="submit" name="" value="Signup" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordForm;
