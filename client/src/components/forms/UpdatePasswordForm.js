import { useState, useEffect } from "react";
import { useUpdatePasswordMutation } from "../../features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import closeModal from "../../utils/closeModal";
import styles from "./Form.module.css";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;
const UpdatePasswordForm = ({ secretKey, setDataRefetch, index }) => {
    const navigate = useNavigate();
    // Import add new user module from API slice
    const [updatePassword, { isSuccess }] = useUpdatePasswordMutation();
    const { id } = useAuth();

    // Hooks to control the update password form
    const [formData, setFormData] = useState({
        newUsername: "",
        newPassword: "",
    });
    const [validNewPassword, setValidNewPassword] = useState(false);

    const { newUsername, newPassword } = formData;

    const [errMsg, setErrMsg] = useState("");

    const resetForm = () => {
        setFormData({
            newUsername: "",
            newPassword: "",
        });
    };

    // Reset input fields to empty when successfully submitted
    useEffect(() => {
        if (isSuccess) {
            resetForm();
            closeModal("#closeUpdateForm")
        }
    }, [isSuccess]);

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    // Validate password every time it changes
    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(newPassword));
    }, [newPassword]);

    // Update the view of input fields after reset
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Call the PUT API to create new user when everything is valid
    const createNewPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== "" && !validNewPassword) {
            setErrMsg("Invalid new password");
        } else {
            try {
                console.log("Secret key ", secretKey);
                const response = await updatePassword({
                    id,
                    newUsername,
                    newPassword,
                    secretKey,
                    index,
                });
                if (response.error) {
                    if (typeof response.error.status != "number") {
                        setErrMsg("No Server Response");
                    } else {
                        setErrMsg(response.error.data?.message);
                    }
                } else {
                    setDataRefetch(true);
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
                                Update password
                            </h1>
                            <button
                                type="button"
                                id="closeUpdateForm"
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
                                name="newPassword"
                                placeholder="New password"
                                value={newPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <p style={{ color: "#ff0000" }} aria-live="assertive">
                            {errMsg}
                        </p>

                        <div className="modal-footer">
                            <input type="submit" name="" value="Update" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordForm;
