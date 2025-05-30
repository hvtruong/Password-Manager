import { useState, useEffect, useCallback } from "react";
import { useAddNewPasswordMutation } from "features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import { readPasswordsFileCSV } from "utils/import";
import closeModal from "utils/closeModal";
import useAuth from "hooks/useAuth";
import Modal from "components/modal/Modal";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,100}$/;

const initialFormState = {
    website: "",
    password: "",
};

const NewPasswordForm = ({ secretKey, triggerDataRefetch }) => {
    // Get current user ID from auth context
    const { id } = useAuth();

    // API hooks to control and validate the form
    const [formData, setFormData] = useState(initialFormState);
    const { website, password } = formData;
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

    let passwordsFile;
    const handleFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            try {
                passwordsFile = await readPasswordsFileCSV(file);
            } catch (err) {
                setErrMsg("Failed to read file: " + err.message);
            }
        }
    };

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
            case password !== "" && validNewPassword === false:
                setErrMsg(
                    "Password is not strong enough. Please ensure it contains at least one uppercase letter, one special character, and meets the required length (6-100)."
                );
                break;
            default:
                try {
                    let response;
                    if (passwordsFile) {
                        const [websites, passwords] = passwordsFile;
                        response = await addNewPassword({
                            id,
                            websites,
                            passwords,
                            secretKey,
                        });
                    } else {
                        response = await addNewPassword({
                            id,
                            websites: [website],
                            passwords: [password],
                            secretKey,
                        });
                    }

                    if (response.error) {
                        const errorMessage =
                            typeof response.error.status !== "number"
                                ? "No Server Response"
                                : response.error.data?.message;
                        setErrMsg(errorMessage);
                    } else {
                        triggerDataRefetch();
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
            type={"text"}
            required={false}
            extraComponent={
                <>
                    <p className="text-white">
                        Or upload a file with your passwords here
                    </p>
                    <input
                        type="file"
                        id="input-file-upload"
                        onChange={handleFileChange}
                    />
                </>
            }
        />
    );
};

export default NewPasswordForm;
