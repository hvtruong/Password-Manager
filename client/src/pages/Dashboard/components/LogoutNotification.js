import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLogoutMutation } from "features/auth/authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import styles from "assets/stylesheets/Forms.module.css";

const LogoutNotification = () => {
    const navigate = useNavigate();

    const [logout, { isLoading, isSuccess, error }] = useLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    let content;
    if (isLoading) {
        content = <PulseLoader color={"#FFF"} />;
    } else if (error) {
        content = (
            <p style={{ color: "#ff0000" }} aria-live="assertive">
                {error}
            </p>
        );
    } else {
        content = (
            <div
                className="modal fade"
                id="logOutModal"
                tabIndex="-1"
                aria-labelledby="logOutModal"
            >
                <div className="modal-dialog modal-content">
                    <div className={styles.box}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center">
                                You are logging out!
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
                                Please make sure to download a copy of your
                                passwords before logging out.
                                <br></br>
                                For security reasons, you will not be able to
                                retrieve your passwords as a guest after logging
                                out.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <Button
                                variant="Primary"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Return
                            </Button>
                            <Button
                                variant="Secondary"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={logout}
                            >
                                Continue to Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return content;
};

export default LogoutNotification;
