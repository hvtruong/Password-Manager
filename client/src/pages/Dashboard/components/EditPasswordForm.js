import { useState, useEffect, useCallback } from "react";
import { useUpdatePasswordMutation } from "features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Modal from "components/modal/Modal";
import closeModal from "utils/closeModal";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const initialFormState = {
    website: "",
    password: "",
};

const EditPasswordForm = ({ secretKey, triggerDataRefetch, index }) => {
    const { id } = useAuth();

    // Hooks to control the update password form
    const [formData, setFormData] = useState(initialFormState);
    const { password, repeatPassword } = formData;
    const [validNewPassword, setValidNewPassword] = useState(false);

    const resetForm = useCallback(() => {
        setFormData(initialFormState);
    }, []);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    // Import add new user module from API slice
    const [updatePassword, { isSuccess }] = useUpdatePasswordMutation();

    // Reset input fields to empty when successfully submitted
    useEffect(() => {
        if (isSuccess) {
            resetForm();
            closeModal("#updatePasswordForm-close");
        }
    }, [isSuccess]);

    // Validate password every time it changes
    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(password));
    }, [password]);

    const navigate = useNavigate();

    // Call the PUT API to create new user when everything is valid
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === repeatPassword && validNewPassword === false) {
            setErrMsg("Invalid new password");
        } else {
            try {
                const response = await updatePassword({
                    id,
                    password,
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
                    triggerDataRefetch();
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
            type={"text"}
        />
    );
};

export default EditPasswordForm;
