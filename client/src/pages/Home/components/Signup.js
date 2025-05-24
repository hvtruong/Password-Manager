import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "features/users/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal, { closeModal } from "components/modal/Modal";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USER_REGEX = /^[a-zA-Z0-9._]{4,20}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/;

const SignUp = () => {
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
    }

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    // API hook
    const [addNewUser, { isSuccess }] = useAddNewUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            resetFormData()
            setTimeout(() => {
                toast.success("Sign up successful! Please check your email to validate!");
            }, 5000);
            navigate("/");
        }
    }, [isSuccess, navigate]);

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
                setErrMsg("Invalid password");
                break;
            case formData.password !== formData.repeatPassword:
                setErrMsg("Passwords do not match");
                break;
            default:
                try {
                    await addNewUser({
                        username: formData.username,
                        password: formData.password,
                        emailAddress: formData.emailAddress,
                    });

                    closeModal("#signupForm-close");
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
            modalId="signupForm"
            title="Sign Up"
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            errMsg={errMsg}
        />
    );
};

export default SignUp;
