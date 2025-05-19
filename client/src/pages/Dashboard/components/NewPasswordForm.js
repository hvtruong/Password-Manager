import { useState, useEffect } from "react";
import { useAddNewPasswordMutation } from "features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import closeModal from "utils/closeModal";
import useAuth from "hooks/useAuth";
import styles from "assets/stylesheets/Forms.module.css";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const NewPasswordForm = ({ secretKey, setDataRefetch }) => {
    const navigate = useNavigate();
    const { id } = useAuth();
    const [addNewPassword, { isSuccess }] = useAddNewPasswordMutation();

    const [formData, setFormData] = useState({
        newWebsite: "",
        newUsername: "",
        newPassword: "",
        repeatNewPassword: "",
    });
    const [validNewPassword, setValidNewPassword] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const { newWebsite, newUsername, newPassword, repeatNewPassword } = formData;

    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(newPassword));
    }, [newPassword]);

    // Reset input fields to empty when successfully submitted
    const resetForm = () => {
        setFormData({
            newWebsite: "",
            newUsername: "",
            newPassword: "",
            repeatNewPassword: "",
        });
    };

    useEffect(() => {
        if (isSuccess) {
            resetForm();
            closeModal("#closeNewPasswordForm");
        }
    }, [isSuccess]);

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    const createNewPassword = async (e) => {
        e.preventDefault();

        if (!validNewPassword) {
            setErrMsg("Password too weak! Please use a stronger password.");
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
                username: newUsername,
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
                setDataRefetch();
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("An error occurred: ", error);
        }
    };

    let content;
    content = (
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
                                id="closeNewPasswordForm"
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
                                placeholder="Website"
                                value={newWebsite}
                                onChange={handleInputChange}
                                required
                            />

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

                            <p className="text-white">
                                Or upload a file with your passwords here
                            </p>

                            <input type="file" id="input-file-upload" />

                            <p
                                style={{ color: "#ff0000" }}
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <input type="submit" value="Create" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    return content;
};

export default NewPasswordForm;
