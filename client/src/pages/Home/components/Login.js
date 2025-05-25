import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "features/auth/authSlice.js";
import { useLoginMutation } from "features/auth/authApiSlice.js";
import closeModal from "utils/closeModal.js";
import usePersist from "hooks/usePersist.js";
import Modal from "components/modal/Modal";

const LogIn = () => {
    // Hooks to control the login form
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = formData;

    const resetFormData = () => {
        setFormData({
            username: "",
            password: "",
        });
    };

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        console.log("Form data changed:", formData);
        setErrMsg("");
    }, [formData]);

    // API hook
    const [login, { isSuccess }] = useLoginMutation();

    const [, setPersist] = usePersist();
    useEffect(() => {
        setPersist(true);
    }, [isSuccess, setPersist]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({
                username,
                password,
            }).unwrap();

            resetFormData();
            dispatch(setCredentials({ accessToken }));
            
            closeModal("#loginForm-close");
            navigate("/dashboard");
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (err) => {
        console.log(err);
        switch (err.status) {
            case "FETCH_ERROR":
                setErrMsg("No Server Response");
                break;
            case 400:
                setErrMsg("Missing Username or Password");
                break;
            case 401:
                setErrMsg("Unauthorized");
                break;
            default:
                setErrMsg(err.data?.message);
        }
    };

    return (
        <Modal
            modalId="loginForm"
            title="Login"
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            errMsg={errMsg}
        />
    );
};

export default LogIn;
