import { useState, useEffect, useCallback } from "react";
import { useAddNewPasswordMutation } from "features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import closeModal from "utils/closeModal";
import useAuth from "hooks/useAuth";
import Modal from "components/modal/Modal";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const initialFormState = {
    website: "",
    username: "",
    password: "",
    newPassword: "",
};

const NewPasswordForm = ({ secretKey, setDataRefetch }) => {
    // Get current user ID from auth context
    const { id } = useAuth();

    // API hooks to control and validate the form
    const [formData, setFormData] = useState(initialFormState);
    const { website, username, password, newPassword } = formData;
    const [validNewPassword, setValidNewPassword] = useState(false);

    const resetForm = useCallback(() => {
        setFormData(initialFormState);
    }, []);

    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(password));
    }, [password]);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    // API hook
    const [addNewPassword, { isSuccess }] = useAddNewPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            resetForm();
            closeModal("#newPasswordForm-close");
        }
    }, [isSuccess, resetForm]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        switch (true) {
            case validNewPassword === false:
                setErrMsg("Password too weak! Please use a stronger password.");
            case password !== newPassword:
                setErrMsg("Passwords do not match");
            default:
                try {
                    const response = await addNewPassword({
                        id,
                        website,
                        username,
                        password,
                        secretKey
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
                    setErrMsg(error);
                }
        }
    };

    return (
        <Modal
            modalId="newPasswordForm"
            title="Create New Password"
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            errMsg={errMsg}
            extraComponent={
                <p className="text-white">
                    Or upload a file with your passwords here
                </p>
            }
        />
    );
};

export default NewPasswordForm;
