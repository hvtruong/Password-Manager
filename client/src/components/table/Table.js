import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";
import { useGetPasswordsByIdQuery } from "../../features/passwords/passwordApiSlice";
import DisplayPasswordData from "./DisplayPasswordData";
import NewPasswordForm from "../forms/NewPasswordForm";
import $ from "jquery";
import "./table.css";

const Table = () => {
    // Import password module from API slice
    const { id } = useAuth();

    const [type, setType] = useState("text");
    const [lock, setLock] = useState("fas fa-unlock fa-fw");
    const [modal, setModal] = useState("collapse");
    const [secretKey, setSecretKey] = useState(""); // State to store the secret key
    const [dataRefetch, setDataRefetch] = useState(false); // State to track form submission

    useEffect(() => {
        if (dataRefetch) {
            console.log("refetching passwords...");
            refetch(); // Refetch passwords when form is submitted
            setDataRefetch(false); // Reset form submission state
        }
    }, [dataRefetch]);

    // State to store the key used for decryption
    // This key is used to decrypt the passwords
    // Re-fetched from the server
    // Triggered and copied value from secretKey only when user clicks the "Decrypt" button
    const [decryptKey, setDecryptKey] = useState("");

    const handleToggle = () => {
        if (type === "password") {
            setLock("fas fa-unlock fa-fw");
            setType("text");
            setModal("collapse");
        } else {
            if (secretKey === "") {
                toast("Please enter your secret key");
                return;
            }
            setLock("fas fa-lock fa-fw");
            setType("password");
            setDecryptKey(secretKey);
            setModal("modal");
        }
    };

    const handleSecretKeyChange = (e) => {
        setSecretKey(e.target.value); // Update the secret key state
    };

    // Fetch passwords using id and secret key
    const {
        data: passwords,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetPasswordsByIdQuery({ id: id, secretKey: decryptKey });

    const [content, setContent] = useState(<PulseLoader color={"#FFF"} />);

    useEffect(() => {
        if (isLoading) {
            setContent(<PulseLoader color={"#FFF"} />);
        } else if (isError) {
            setContent(<p className="errmsg">{error?.data?.message}</p>);
        } else if (isSuccess) {
            console.log("Passwords: ", passwords);
            console.log("Secret Key: ", secretKey);
            setContent(DisplayPasswordData(passwords, secretKey));
        }
    }, [isLoading, isError, isSuccess, error, passwords]);
    const test = "modal"
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="table-filter col-sm-8 d-flex justify-content-center align-items-center">
                                    <ToastContainer
                                        position="top-center"
                                        className="justify-content-center"
                                    />
                                    <div className="filter-group">
                                        <label>Secret Key</label>
                                        <input
                                            type={type}
                                            className="form-control"
                                            name="secretKey"
                                            id="secretKey"
                                            placeholder="Enter your secret key"
                                            autoComplete="off"
                                            required
                                            value={secretKey} // Bind the input value to the state
                                            onChange={handleSecretKeyChange} // Update state on change
                                            disabled={type === "password"} // Disable input when lock is clicked
                                        />
                                        <i
                                            onClick={handleToggle}
                                            className={lock}
                                            id="lock"
                                            style={{
                                                marginLeft: "7px",
                                            }}
                                        ></i>
                                    </div>
                                </div>
                                <div className="table-filter col-sm-4 d-flex justify-content-center align-items-center">
                                    <div className="filter-group">
                                        <Button
                                            variant="primary"
                                            className="btn btn-primary bg-success"
                                            onClick={() => {
                                                if (type === passwords) {
                                                    toast(
                                                        "Secret key is required"
                                                    );
                                                    return;
                                                }
                                            }}
                                        >
                                            Decrypt
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="btn btn-primary"
                                            data-bs-target="#newPasswordForm"
                                            data-bs-toggle={modal === "modal" ? "modal" : "collapse"}
                                            onClick={() => {
                                                console.log("Modal value: ", modal);
                                                if (type === "text") {
                                                    toast(
                                                        "Secret key is required"
                                                    );
                                                    return;
                                                }
                                            }}
                                        >
                                            Add New Password
                                        </Button>
                                        <NewPasswordForm
                                            secretKey={secretKey}
                                            setDataRefetch={() => {
                                                setDataRefetch(true);
                                            }}
                                            closeModal={() => {
                                                setModal("collapse");
                                            }}
                                        />
                                        <Button
                                            variant="Secondary"
                                            className="btn btn-secondary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#updatePasswordForm"
                                        >
                                            Export File
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>URL</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{content}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Table;
