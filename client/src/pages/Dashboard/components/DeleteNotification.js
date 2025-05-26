import { useState, useEffect } from "react";
import { useDeletePasswordMutation } from "features/passwords/passwordApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import closeModal from "utils/closeModal";
import styles from "assets/stylesheets/Forms.module.css";
import { Button } from "react-bootstrap"
import { toast } from "react-toastify";

const DeleteNotification = ({ triggerDataRefetch, index }) => {
    const navigate = useNavigate();
    // Import add new user module from API slice
    const [deletePassword, { isSuccess }] = useDeletePasswordMutation();
    const { id } = useAuth();

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        if (isSuccess) {
            toast("Password deleted!")
            triggerDataRefetch()
            closeModal("#deleteNotification-close");
            navigate("/dashboard");
        }
    }, [isSuccess, triggerDataRefetch, navigate]);

    // Call the PUT API to create new user when everything is valid
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deletePassword({
                id,
                index,
            });
            if (response.error) {
                if (typeof response.error.status != "number") {
                    setErrMsg("No Server Response");
                } else {
                    setErrMsg(response.error.data?.message);
                }
            }
        } catch (error) {
            console.log("An error occurred: ", error);
        }
    };

    return (
        <div
            className="modal fade"
            id="deleteNotification"
            tabIndex="-1"
            aria-labelledby="deleteNotification"
        >
            <div className="modal-dialog modal-content">
                <div className={styles.box}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center">
                            Deleting password
                        </h1>
                        <button
                            type="button"
                            id="deleteNotification-close"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <p className="text-white">
                            Are you sure that you want to delete this password?
                        </p>
                    </div>
                    {errMsg && (
                        <p
                            className="mt-2"
                            style={{ color: "#ff0000" }}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                    )}
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
                            onClick={handleSubmit}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteNotification;
