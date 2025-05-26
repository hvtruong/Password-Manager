import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "features/users/userApiSlice";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";
import Modal, { closeModal } from "components/modal/Modal";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USER_REGEX = /^[a-zA-Z0-9._]{4,20}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const EditUser = () => {
    // Get current user ID from auth context
    const { id } = useAuth();

    // Hooks to control the login form
    const [formData, setFormData] = useState({
        emailAddress: "",
        username: "",
        password: "",
        repeatPassword: "",
    });

    const resetFormData = () => {
        setFormData({
            emailAddress: "",
            username: "",
            password: "",
            repeatPassword: "",
        });
    };

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    // API hook
    const [updateUser, { isSuccess }] = useUpdateUserMutation();

    useEffect(() => {
        if (isSuccess) {
            resetFormData();
            toast("User updated!");
        }
    }, [isSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        switch (true) {
            case EMAIL_REGEX.test(formData.emailAddress) === false:
                setErrMsg("Invalid email address");
                break;
            case USER_REGEX.test(formData.username) === false:
                setErrMsg("Invalid username");
                break;
            case PWD_REGEX.test(formData.password) === false:
                setErrMsg(
                    "Password is not strong enough. Please ensure it contains at least one uppercase letter, one special character, and meets the required length."
                );
                break;
            case formData.password !== formData.repeatPassword:
                setErrMsg("Passwords do not match");
                break;
            default:
                try {
                    await updateUser({
                        id: id,
                        emailAddress: formData.emailAddress,
                        username: formData.username,
                        password: formData.password,
                    });

                    closeModal("#editUserForm-close");
                } catch (err) {
                    if (typeof err.status !== "number") {
                        setErrMsg("No Server Response");
                    } else {
                        setErrMsg(err.data?.message);
                    }
                }
        }
    };

    return (
        <Modal
            modalId="editUserForm"
            title="Edit User"
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            errMsg={errMsg}
        />
    );
};

export default EditUser;
