import { useState, useEffect } from "react";
import { useAddNewPasswordMutation } from "../../features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import $ from "jquery";
import styles from "./Form.module.css";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const NewPasswordForm = ({ secretKey }) => {
    const navigate = useNavigate();
    const [addNewPassword, { isSuccess }] = useAddNewPasswordMutation();
    const { id } = useAuth();

    const [formData, setFormData] = useState({
        newWebsite: "",
        newPassword: "",
        repeatNewPassword: "",
    });

    const [validNewPassword, setValidNewPassword] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const { newWebsite, newPassword, repeatNewPassword } = formData;

    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(newPassword));
    }, [newPassword]);

    useEffect(() => {
        if (isSuccess) {
            setFormData({ newWebsite: "", newPassword: "", repeatNewPassword: "" });
        }
    }, [isSuccess]);

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const createNewPassword = async (e) => {
        e.preventDefault();

        if (!validNewPassword) {
            setErrMsg("Invalid new password");
            return;
        }

        if (newPassword !== repeatNewPassword) {
            setErrMsg("Passwords do not match");
            return;
        }

        try {
            const response = await addNewPassword({
                id,
                newWebsite,
                password: newPassword,
                secretKey,
            });

            if (response.error) {
                const errorMessage =
                    typeof response.error.status !== "number"
                        ? "No Server Response"
                        : response.error.data?.message;
                setErrMsg(errorMessage);
            } else {
                $("#closeFormButton").trigger("click");
            }
        } catch (error) {
            console.error("An error occurred: ", error);
        }
    };

    return (
        <div
            className="modal fade"
            id="newPasswordForm"
            tabIndex="-1"
            aria-labelledby="newPasswordForm"
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
                                Please fill in the fields to update your password!
                            </p>

                            <input
                                type="text"
                                name="newWebsite"
                                placeholder="Password name"
                                value={newWebsite}
                                onChange={handleInputChange}
                                required
                            />

                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New password"
                                value={newPassword}
                                onChange={handleInputChange}
                                required
                            />

                            <input
                                type="password"
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
                            <input type="submit" value="Create" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordForm;
