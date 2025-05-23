import { useState, useEffect } from "react";
import { useUpdatePasswordMutation } from "features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Modal from "components/modal/Modal";
import closeModal from "utils/closeModal";

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
            closeModal("#closeUpdateForm");
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
    const handleSubmit = async (e) => {
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
        <Modal
            modalId="updatePasswordForm"
            title="Update Password"
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            errMsg={errMsg}
        />
    );
};

export default UpdatePasswordForm;
