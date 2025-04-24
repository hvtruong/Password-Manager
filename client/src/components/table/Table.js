import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";
import { useGetPasswordsByIdQuery } from "../../features/passwords/passwordApiSlice";
import DisplayPasswordData from "./DisplayPasswordData";
import NewPasswordForm from "../forms/NewPasswordForm";
import "./table.css";

const Table = () => {
    // Import password module from API slice
    const { id } = useAuth();

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState("fas fa-eye-slash fa-fw");
    const [secretKey, setSecretKey] = useState(""); // State to store the secret key
    const [shouldRefetch, setShouldRefetch] = useState(false); // State to track form submission

    const handleRefetch = () => {
        setShouldRefetch(true); // Set form submission state to true
    };

    useEffect(() => {
        if (shouldRefetch) {
            console.log("refetching passwords...");
            refetch(); // Refetch passwords when form is submitted
            setShouldRefetch(false); // Reset form submission state
        }
    }, [shouldRefetch]);

    // State to store the key used for decryption
    // This key is used to decrypt the passwords
    // Re-fetched from the server
    // Triggered and copied value from secretKey only when user clicks the "Decrypt" button
    const [decryptKey, setDecryptKey] = useState("");

    const handleToggle = () => {
        if (type === "password") {
            setIcon("fas fa-eye fa-fw");
            setType("text");
        } else {
            setIcon("fas fa-eye-slash fa-fw");
            setType("password");
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
                                    <div className="filter-group">
                                        <label>Secret Key</label>
                                        <input
                                            type={type}
                                            className="form-control"
                                            name="secretKey"
                                            value={secretKey} // Bind the input value to the state
                                            onChange={handleSecretKeyChange} // Update state on change
                                        />
                                        <i
                                            onClick={handleToggle}
                                            className={icon}
                                            id="eye"
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
                                                setDecryptKey(secretKey);
                                            }}
                                        >
                                            Decrypt
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#newPasswordForm"
                                        >
                                            Add New Password
                                        </Button>
                                        <NewPasswordForm
                                            secretKey={secretKey}
                                            handleRefetch={handleRefetch}
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
